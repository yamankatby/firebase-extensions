Use this extension to dynamically generate fully customizable social media images for your website.

When triggered by an HTTP request, this extension:

- Finds the target template in the provided Firestore collection
- Processes the template with the provided query parameters
- Generates an image from the processed template
- Returns the generated image as a response

#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

#### Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Coud Firestore

- Cloud Functions (Node.js 10+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))
