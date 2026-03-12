import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virginia District Checker — Embed",
  robots: { index: false, follow: false },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-transparent">{children}</div>;
}
