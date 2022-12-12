import Link from "next/link";

const navigation = [
  {
    group: "Firestore Relationships",
    pages: [
      { title: "Introduction", href: "/firestore-relationships" },
      { title: "One-To-One", href: "/firestore-one-to-one" },
      { title: "Connect Document", href: "/firestore-connect-document" },
    ],
  },
  {
    group: "Generate OG Image",
    pages: [
      { title: "Introduction", href: "/generate-og-image" },
      { title: "Installation", href: "/generate-og-image/installation" },
      { title: "Config Params", href: "/generate-og-image/config-params" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex mx-auto">
        <ul className="px-7 w-80">
          <li className="mt-8">
            <Link
              href="/"
              className="block hover:border-slate-400 text-slate-700 hover:text-slate-900"
            >
              Getting Started
            </Link>
          </li>
          {navigation.map((group) => (
            <li key={group.group} className="mt-8">
              <h5 className="font-semibold text-slate-900 mb-3">
                {group.group}
              </h5>
              <ul className="space-y-2 border-l border-slate-100">
                {group.pages.map((page) => (
                  <li key={page.title}>
                    <Link
                      href={page.href}
                      className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400 text-slate-700 hover:text-slate-900"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <article className="prose py-8">{children}</article>
      </div>
    </div>
  );
}
