import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const color = ["red", "orange", "green", "blue", "purple"][
    Math.floor(Math.random() * 5)
  ];

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${color}`}>{children}</body>
    </html>
  );
}
