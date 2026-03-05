import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#1B3A5C] text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          🗺️ VA District Checker
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-200 transition-colors">Check Your District</Link>
          <Link href="/blog" className="hover:text-blue-200 transition-colors">Why It Matters</Link>
          <a
            href="https://secure.actblue.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1B3A5C] px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition-colors"
          >
            Support Fair Maps
          </a>
        </nav>
      </div>
    </header>
  );
}
