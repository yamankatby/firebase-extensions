import { WebClient } from "@slack/web-api";
import * as functions from "firebase-functions";

interface Config {
  analyticsEventType: string;
  slackToken: string;
  slackChannel: string;
}

const config: Config = {
  analyticsEventType: process.env.ANALYTICS_EVENT_TYPE!,
  slackToken: process.env.SLACK_TOKEN!,
  slackChannel: process.env.SLACK_CHANNEL!,
};

const web = new WebClient(config.slackToken);

export const notifySlackChannel = functions.analytics
  .event(config.analyticsEventType)
  .onLog((event) => {
    return web.chat.postMessage({
      channel: config.slackChannel,
      text: `Hey your message here`,
    });
  });
