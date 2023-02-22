# Dynamic OG Image Generator

> **Note** This extension is still in beta, if you find any bugs or have any suggestions, please [file an issue](https://github.com/yamankatby/firebase-extensions/issues/new). Also, if you find this extension useful, please consider giving the repository a star ⭐️.

[![Follow me on Twitter](https://img.shields.io/twitter/follow/yamankatby?style=social)](https://twitter.com/intent/follow?screen_name=yamankatby)

## ✏️ Introduction

Use the **Dynamic OG Image Generator** (`yaman/generate-og-image`) extension to dynamically generate fully customizable social media images for your website.

## ✨ Features

- ✅ Handlebars template engine
- ✅ Markdown support
- ✅ Customizable fonts
- 🚧 Different emoji styles ([Twemoji](https://twemoji.twitter.com/) is ready, and others are coming soon)
- ✅ Customizable format (PNG, JPEG, WEBP), width, and height
- ✅ Generated once, and cached for next time

## 🧩 Install the extension

To install the extension, follow the steps on the [Install a Firebase Extension](https://firebase.google.com/docs/extensions/install-extensions) page. In summary, do one of the following:

- **Install from the Firebase console:** Click the button below:

  [![install-extension](https://user-images.githubusercontent.com/35961879/201528504-4e99bfc7-8691-4151-b63d-0511097d7c18.png)](https://console.firebase.google.com/project/_/extensions/install?ref=yaman/generate-og-image)

- **Install from the Firebase CLI:** Run the following command:

  ```bash
  firebase ext:install yaman/generate-og-image --project=YOUR_PROJECT_ID
  ```

### 🛠️ Configuration parameters

During the installation of the extension, you will be prompted to specify a couple of configuration parameters:

| Name                    | Description                                                                                                                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location                | Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).                                                                               |
| Templates collection    | The path to the Cloud Firestore collection where you would like to store the templates documents. The collection must have a document for each template, where the document id is the name of the template and the document contains a `template` field with the template string. |
| Create example template | Do you want the extension to automatically create an example template document in the templates collection after installation?                                                                                                                                                    |
| Allowed CORS origins    | A comma-separated list of allowed CORS origins. Use `*` to allow all origins in development mode. This is useful to lock down the API and only allow your own websites to use it.                                                                                                 |
| Cloud Function memory   | The amount of memory to allocate to the Cloud Function that generates the images.                                                                                                                                                                                                 |

## 🙏 Acknowledgements

- Vercel for writing the [og-image](https://github.com/vercel/og-image) project that inspired this extension.
