# Getting started

## Prerequisites

- Setup a Firebase project if you haven't already.
- [Install the `Connect Firestore Document` extension](https://console.firebase.google.com/project/_/extensions/install?ref=yaman/firestore-connect-document) to your Firebase project.

  - Source Collection Path: `users`
  - Target Collection Path: `posts`
  - Source Document ID Field Name: `createdById`
  - Source Fields: `name,email,photoURL`
  - Target Field Name: `createdBy`
  - Source Document Deletion Behavior: `Delete the entire target document`

## Run the sample app locally

- Clone the repository
- Enter the `example` directory
- Run `npm install` or `yarn install` to install dependencies
- Open `src/App.js` and put your web app's Firebase configuration in the `firebaseConfig` variable
- Run `npm start` or `yarn start` to start the development server
