# Generate Open Graph Images

> **Note** This extension is still in beta. If you have any feedback, please [file an issue](). Also, if you find this extension useful, please consider giving it a star 🌟

[![Follow me on Twitter](https://img.shields.io/twitter/follow/yamankatby?style=social)](https://twitter.com/intent/follow?screen_name=yamankatby)

- [Generate Open Graph Images](#generate-open-graph-images)
  - [✏️ Introduction](#️-introduction)
  - [✨ Features](#-features)
  - [🧩 Install the extension](#-install-the-extension)
    - [🛠️ Configuration parameters](#️-configuration-parameters)
  - [🙏 Acknowledgements](#-acknowledgements)

## ✏️ Introduction

Use the **Generate Open Graph Images** (`yaman/generate-og-image`) extension to create dynamic, fully customizable, and SEO-friendly Open Graph images for your website.

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

| Name                  | Description                                                                                                                                                                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location              | Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).                                                                               |
| Template              | The [handlebars](https://handlebarsjs.com/) template to use for generating the image. The template must be either a raw HTML string or a URL to a public HTML file.                                                                                                               |
| Templates collection  | The path to the Cloud Firestore collection that contains the templates to use for generating the images. The collection must have a document for each template, where the document ID is the template name and the document contains a `template` field with the template string. |
| Markdown params       | A comma-separated list of query parameters that contain Markdown-formatted text. The extension will convert the Markdown to HTML before rendering the template.                                                                                                                   |
| Emoji provider        | The style of emojis to use in the generated images.                                                                                                                                                                                                                               |
| Width                 | The width of the generated image in pixels.                                                                                                                                                                                                                                       |
| Height                | The height of the generated image in pixels.                                                                                                                                                                                                                                      |
| Format                | The format of the generated image.                                                                                                                                                                                                                                                |
| Cache-Control header  | The value of the `Cache-Control` header to set on the generated images.                                                                                                                                                                                                           |
| Cloud Function memory | The amount of memory to allocate to the Cloud Function.                                                                                                                                                                                                                           |

## 🙏 Acknowledgements

- Vercel for the [og-image](https://github.com/vercel/og-image)
