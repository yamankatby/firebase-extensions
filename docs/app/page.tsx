import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Extension({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description: string;
}) {
  return (
    <div className="w-96 p-6 flex gap-6 flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold title">{title}</h1>
        <p className="mt-2 subtitle">{description}</p>
      </div>
      <a
        href={`https://console.firebase.google.com/project/_/extensions/install?ref=yaman/${name}`}
        target="_blank"
        className="title font-medium underline"
      >
        Install on Firebase
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main className={inter.className}>
      <header className="container mx-auto p-6">
        <div className="flex flex-wrap justify-center">
          {[
            {
              name: "firestore-connect-document",
              title: "Connect Firestore Document",
              description:
                "Keeps denormalized copies of documents in sync between two collections.",
            },
            {
              name: "firestore-one-to-one",
              title: "Firestore One-To-One",
              description:
                "Implements a one-to-one relationship pattern between two collections in Cloud Firestore.",
            },
            {
              name: "generate-og-image",
              title: "Dynamic OG Image Generator",
              description:
                "Generates dynamic and fully customizable Open Graph images.",
            },
          ].map(({ name, title, description }) => (
            <Extension name={name} title={title} description={description} />
          ))}
        </div>
      </header>
    </main>
  );
}

export const dynamic = "force-dynamic";
