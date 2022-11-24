export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose lg:prose-xl mx-auto mt-20">{children}</article>
  );
}
