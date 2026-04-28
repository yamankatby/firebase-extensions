import * as admin from "firebase-admin";
import { getExtensions } from "firebase-admin/extensions";
import { getFunctions } from "firebase-admin/functions";
import * as functions from "firebase-functions/v1";

admin.initializeApp();

const KIT_API_BASE = "https://api.kit.com/v4";
const BACKFILL_PAGE_SIZE = 1000;

async function kitFetch(
  path: string,
  init: { method: string; body?: unknown },
): Promise<Response> {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    throw new Error("KIT_API_KEY is not set");
  }

  const response = await fetch(`${KIT_API_BASE}${path}`, {
    method: init.method,
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Kit API ${response.status} on ${init.method} ${KIT_API_BASE}${path}: ${body}`,
    );
  }

  return response;
}

async function upsertKitSubscriber(
  email: string,
  firstName: string | null,
): Promise<void> {
  const formId = process.env.KIT_FORM_ID;
  const path = formId ? `/forms/${formId}/subscribers` : "/subscribers";

  await kitFetch(path, {
    method: "POST",
    body: {
      email_address: email,
      first_name: firstName,
      state: "active",
    },
  });
}

async function findKitSubscriberId(email: string): Promise<number | null> {
  const response = await kitFetch(
    `/subscribers?email_address=${encodeURIComponent(email)}`,
    { method: "GET" },
  );
  const data = (await response.json()) as {
    subscribers?: Array<{ id: number }>;
  };
  return data.subscribers?.[0]?.id ?? null;
}

async function unsubscribeKitSubscriber(id: number): Promise<void> {
  await kitFetch(`/subscribers/${id}/unsubscribe`, { method: "POST" });
}

export const syncOnCreate = functions.auth.user().onCreate(async (user) => {
  if (!user.email) {
    functions.logger.info(
      `Skipping user ${user.uid}: no email address on the account.`,
    );
    return;
  }

  await upsertKitSubscriber(user.email, user.displayName ?? null);
  functions.logger.info(`Synced ${user.email} to Kit.`);
});

export const syncOnDelete = functions.auth.user().onDelete(async (user) => {
  if (!user.email) return;

  const id = await findKitSubscriberId(user.email);
  if (!id) {
    functions.logger.info(
      `No Kit subscriber for ${user.email}; nothing to unsubscribe.`,
    );
    return;
  }

  await unsubscribeKitSubscriber(id);
  functions.logger.info(`Unsubscribed ${user.email} from Kit.`);
});

export const backfillUsers = functions.tasks
  .taskQueue()
  .onDispatch(async (data: { pageToken?: string }) => {
    const runtime = getExtensions().runtime();

    if (process.env.DO_BACKFILL !== "yes") {
      await runtime.setProcessingState(
        "PROCESSING_COMPLETE",
        "Backfill skipped by configuration.",
      );
      return;
    }

    const result = await admin
      .auth()
      .listUsers(BACKFILL_PAGE_SIZE, data.pageToken);

    let synced = 0;
    let skipped = 0;
    let failed = 0;

    for (const user of result.users) {
      if (!user.email) {
        skipped++;
        continue;
      }
      try {
        await upsertKitSubscriber(user.email, user.displayName ?? null);
        synced++;
      } catch (err) {
        functions.logger.error(`Failed to sync ${user.email}`, err);
        failed++;
      }
    }

    functions.logger.info(
      `Backfill page complete. Synced: ${synced}, skipped: ${skipped}, failed: ${failed}.`,
    );

    if (result.pageToken) {
      const queue = getFunctions().taskQueue(
        "backfillUsers",
        process.env.EXT_INSTANCE_ID,
      );
      await queue.enqueue({ pageToken: result.pageToken });
      return;
    }

    await runtime.setProcessingState(
      failed > 0 ? "PROCESSING_WARNING" : "PROCESSING_COMPLETE",
      `Backfill finished. See logs for per-page details.`,
    );
  });
