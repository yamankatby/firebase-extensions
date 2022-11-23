# Generate Open Graph Images

**Author**: Yaman Katby (**[https://github.com/yamankatby](https://github.com/yamankatby)**)

**Description**: Generate dynamic and fully customizable Open Graph images for your website.

**Details**: Use this extension to generate dynamic and fully customizable Open Graph images for your website.

When triggered by an HTTP request, this extension responds with an image generated from the provided query parameters.

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)

**Configuration Parameters:**

- Cloud Functions location: Where do you want to deploy the functions created for this extension? For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

- Template: The [handlebars](https://handlebarsjs.com/) template to use for generating the image. The template must be either a raw HTML string or a URL to a public HTML file.
  If you want to store the templates in a Cloud Firestore collection, leave this field empty and set the `TEMPLATES_COLLECTION` parameter instead.

- Templates collection: The path to the Cloud Firestore collection that contains the templates to use for generating the images. The collection must have a document for each template, where the document ID is the template name and the document contains a `template` field with the template string.
  If you want to use a static template, leave this field empty and set the `TEMPLATE` parameter instead.

- Markdown params: A comma-separated list of query parameters that contain Markdown-formatted text. The extension will convert the Markdown to HTML before rendering the template.
  Leave this field empty if you don't want to use Markdown.

- Emoji provider: The style of emojis to use in the generated images.

* `twemoji` uses [Twemoji](https://twemoji.twitter.com/) emojis.

- Image width: The width of the generated image in pixels.

- Image height: The height of the generated image in pixels.

- Image format: The format of the generated image.

- Cache-Control header: The value of the `Cache-Control` header to set on the generated images.

- Cloud Function memory: The amount of memory to allocate to the Cloud Function.

**Cloud Functions:**

- **api:** HTTP request-triggered function that responds with an Open Graph image.

**Access Required**:

This extension will operate with the following project IAM roles:

- datastore.user (Reason: Allows this extension to access Cloud Firestore to read the templates collection.)
