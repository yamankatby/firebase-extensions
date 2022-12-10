import * as admin from "firebase-admin";

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
process.env.FIREBASE_FIRESTORE_EMULATOR_ADDRESS = "localhost:8080";
process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
process.env.PUBSUB_EMULATOR_HOST = "localhost:8085";
process.env.GOOGLE_CLOUD_PROJECT = "demo-test";

admin.initializeApp();

const db = admin.firestore();

const waitForTheExtensionToRun = (times = 1) =>
  new Promise((r) => setTimeout(r, 800 * times));

describe("one-to-one", () => {
  it("shares data between documents", async () => {
    await db.doc("cities/ankara").set({ name: "Ankara" });
    await db
      .doc("countries/turkiye")
      .set({ name: "Türkiye", capital: { id: "ankara" } });

    await waitForTheExtensionToRun(2);

    const turkiye = await db.doc("countries/turkiye").get();
    const ankara = await db.doc("cities/ankara").get();

    expect(turkiye.data()?.capital.name).toBe("Ankara");
    expect(ankara.data()?.country.name).toBe("Türkiye");
  });
});
