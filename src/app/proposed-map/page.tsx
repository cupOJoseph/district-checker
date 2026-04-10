import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { districts } from "@/data/districts";

export const metadata: Metadata = {
  title: "Virginia's Proposed 2026 Congressional Map — Explained | vadistricts.org",
  description:
    "A plain-English breakdown of Virginia's proposed 2026 congressional district map: what changes, which districts flip, and what it means for the 2026 elections.",
  keywords: [
    "Virginia proposed congressional map",
    "Virginia new district map 2026",
    "VA redistricting map",
    "Virginia congressional map explained",
    "new VA-7 district",
  ],
  alternates: { canonical: "https://vadistricts.org/proposed-map" },
  openGraph: {
    title: "Virginia's Proposed 2026 Congressional Map — Explained",
    description:
      "A plain-English breakdown of Virginia's proposed 2026 congressional district map.",
    url: "https://vadistricts.org/proposed-map",
  },
};

export default function ProposedMapPage() {
  const dLean = districts.filter((d) => d.proposedLean === "D").length;
  const rLean = districts.filter((d) => d.proposedLean === "R").length;
  const tossup = districts.filter((d) => d.proposedLean === "Tossup").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate">
          <h1 className="text-4xl font-bold text-[#1B3A5C] mb-2">
            Virginia&apos;s Proposed 2026 Congressional Map — Explained
          </h1>
          <p className="text-gray-500 text-sm mb-8">Updated April 2026 · 7 min read</p>

          <p>
            Virginia is in the middle of a rare mid-decade redistricting. After the General
            Assembly passed new congressional maps in February 2026, voters will decide whether to
            adopt them in a statewide referendum on{" "}
            <Link href="/referendum">April 21, 2026</Link>. This page is a plain-English overview
            of what&apos;s actually in the proposal.
          </p>

          <div className="not-prose grid grid-cols-3 gap-3 my-8">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-700">{dLean}</div>
              <div className="text-xs text-blue-700 uppercase font-semibold">
                Democratic-lean
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-700">{tossup}</div>
              <div className="text-xs text-purple-700 uppercase font-semibold">Tossup</div>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-700">{rLean}</div>
              <div className="text-xs text-red-700 uppercase font-semibold">Republican-lean</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">The big picture</h2>
          <p>
            Virginia keeps 11 congressional districts, but the lines inside the state finally
            start to make sense. The old map carved up communities to lock in safe seats for
            incumbents of both parties. The proposed map keeps cities, counties, and regional
            corridors together, and in doing so makes several districts genuinely competitive
            again — which means voters, not mapmakers, get to decide who represents them.
          </p>
          <p>
            This matters beyond Virginia. As other states have gerrymandered more and more
            aggressively, checks and balances only work if fair-map states actually stand up.
            Virginia&apos;s proposed map is one of those levers — a chance to show what
            representation looks like when districts are drawn for people instead of politicians.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">
            The three biggest changes
          </h2>

          <h3 className="text-xl font-bold text-[#1B3A5C] mt-6 mb-2">
            1. The 7th District is almost entirely rewritten
          </h3>
          <p>
            The current <Link href="/districts/7">VA-7</Link> runs through Fredericksburg,
            Spotsylvania, Stafford, and Prince William — exurban Northern Virginia. The proposed
            VA-7 looks nothing like it: it stitches together North Arlington, Falls Church, and
            central Fairfax with a corridor running south through Culpeper to Augusta County. No
            sitting member of Congress lives in this new district&apos;s core.
          </p>

          <h3 className="text-xl font-bold text-[#1B3A5C] mt-6 mb-2">
            2. VA-1, VA-5, and VA-6 all become competitive
          </h3>
          <p>
            Three currently Republican seats — the{" "}
            <Link href="/districts/1">1st (Wittman)</Link>,{" "}
            <Link href="/districts/5">5th (McGuire)</Link>, and{" "}
            <Link href="/districts/6">6th (Cline)</Link> — all become Democratic-leaning or
            toss-ups under the proposed map. The 1st absorbs Fredericksburg and Stafford; the 5th
            picks up more of Albemarle; the 6th adds Roanoke and Harrisonburg.
          </p>

          <h3 className="text-xl font-bold text-[#1B3A5C] mt-6 mb-2">
            3. VA-9 is drawn around a real community of interest
          </h3>
          <p>
            The <Link href="/districts/9">9th District</Link> now cleanly covers Southwest
            Virginia — coal country, the mountains, and Bristol — keeping those communities
            together instead of splitting them across multiple districts to prop up incumbents
            elsewhere. It reflects the actual geography and culture of the region, not a partisan
            carve-up.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">
            What stays mostly the same
          </h2>
          <ul>
            <li>
              <Link href="/districts/3">VA-3</Link> — Hampton Roads core, safely Democratic.
            </li>
            <li>
              <Link href="/districts/8">VA-8</Link> — Alexandria + South Arlington, still the
              state&apos;s most Democratic district.
            </li>
            <li>
              <Link href="/districts/11">VA-11</Link> — Most of Fairfax County, still safely
              Democratic.
            </li>
            <li>
              <Link href="/districts/10">VA-10</Link> — Loudoun + western Fairfax, still a
              competitive-Democratic seat.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">
            How to see your own district
          </h2>
          <p>
            The fastest way to see exactly what changes for you is to{" "}
            <Link href="/">enter your address on the checker</Link>. It will show you your current
            district, your proposed district, and whether they&apos;re different.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">Why it matters</h2>
          <p>
            Democracy depends on checks and balances, and fair districts are one of the biggest
            levers we have. When maps are drawn to reflect real communities instead of to protect
            incumbents, elections get more competitive, turnout goes up, and elected officials
            actually have to listen to the people they represent. Virginia&apos;s proposed map is
            a chance to pull that lever — and show the rest of the country what fair representation
            looks like.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">Sources</h2>
          <p>
            District boundaries come from the Virginia Department of Elections and the U.S. Census
            Bureau. Proposed-map partisan numbers are derived from precinct-level 2024 results
            overlaid on the new boundaries.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
