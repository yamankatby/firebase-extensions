Use this extension to embed a set of fields from a document in another document in Firestore and keep them in sync.

This extension is useful for creating "one-to-one" and "one-to-many" like releationships between documents in Firestore.

For example, you can use this extension to grab a user's profile information (like their name and photo URL) from the `users` collection and embed it in the documents that represent their comments in the `comments` collection. This way, you can display the user's profile information in the comments without having to make an extra query to the `users` collection.

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Firestore

- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
