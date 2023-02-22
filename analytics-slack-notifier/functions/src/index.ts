import { WebClient } from "@slack/web-api";
import * as functions from "firebase-functions";

interface Config {
  analyticsEventName: string;
  slackToken: string;
  slackChannel: string;
}

const config: Config = {
  analyticsEventName: process.env.ANALYTICS_EVENT_NAME!,
  slackToken: process.env.SLACK_TOKEN!,
  slackChannel: process.env.SLACK_CHANNEL!,
};

const slack = new WebClient(
  "xoxb-2104891544466-4850063687424-c8jZNooKWmNN7HNJbiam0s5E"
);

exports.greetTheWorld = functions.analytics
  .event(config.analyticsEventName)
  .onLog((event) => {
    console.log("__**__", event);
    return slack.chat.postMessage({
      channel: config.slackChannel,
      text: `Hello world!`,
    });
  });
