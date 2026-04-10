import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#1B3A5C] text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          🗺️ VA District Checker
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/" className="hover:text-blue-200 transition-colors">Check</Link>
          <Link href="/districts" className="hover:text-blue-200 transition-colors">Districts</Link>
          <Link href="/proposed-map" className="hover:text-blue-200 transition-colors">Proposed Map</Link>
          <Link href="/referendum" className="hover:text-blue-200 transition-colors">Referendum</Link>
          <Link href="/faq" className="hover:text-blue-200 transition-colors">FAQ</Link>
          <Link href="/blog" className="hover:text-blue-200 transition-colors hidden md:inline">Why It Matters</Link>
        </nav>
      </div>
    </header>
  );
}
