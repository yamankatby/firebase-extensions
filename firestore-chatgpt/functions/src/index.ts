/*
 * This template contains a HTTP function that responds
 * with a greeting when called
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about building extensions in the docs:
 * https://firebase.google.com/docs/extensions/alpha/overview
 */

import * as functions from "firebase-functions";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
});

const openai = new OpenAIApi(configuration);

interface Config {
  apiKey: string;
  collectionPath: string;
  messagesFieldName: string;
  systemMessage?: string;
}

exports.greetTheWorld = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const resp = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a JSON generator,You are a user name extractor, find the user name from the following text and response with a JSON object has only name key",
        },
        {
          role: "user",
          content:
            "my name starts with Y and ends with n and in between is ama",
        },
      ],
    });

    res.json(resp.data);
  }
);
