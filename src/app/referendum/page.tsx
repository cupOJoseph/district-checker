import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "Virginia Redistricting Referendum — April 21, 2026 | vadistricts.org",
  description:
    "Virginia's mid-decade redistricting referendum is April 21, 2026. Learn what's on the ballot, when early voting ends, and how the proposed congressional maps will appear on your ballot.",
  keywords: [
    "Virginia redistricting referendum",
    "April 21 2026 Virginia",
    "Virginia redistricting ballot",
    "Virginia special election",
    "VA redistricting vote",
    "mid-decade redistricting Virginia",
  ],
  alternates: { canonical: "https://vadistricts.org/referendum" },
  openGraph: {
    title: "Virginia Redistricting Referendum — April 21, 2026",
    description:
      "Everything you need to know about Virginia's April 21, 2026 mid-decade redistricting referendum.",
    url: "https://vadistricts.org/referendum",
  },
};

export default function ReferendumPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate">
          <h1 className="text-4xl font-bold text-[#1B3A5C] mb-2">
            Virginia Redistricting Referendum
          </h1>
          <p className="text-gray-500 text-sm mb-8">April 21, 2026</p>

          <div className="not-prose bg-[#1B3A5C] text-white rounded-xl p-6 mb-10 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs uppercase text-blue-200 font-semibold">Election Day</div>
              <div className="text-2xl font-bold">April 21, 2026</div>
            </div>
            <div>
              <div className="text-xs uppercase text-blue-200 font-semibold">Early Voting</div>
              <div className="text-2xl font-bold">Open Now</div>
              <div className="text-xs text-blue-200">Started March 6, 2026</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-8 mb-4">What is on the ballot?</h2>
          <p>
            Virginia voters will decide whether to adopt a new set of congressional district maps
            in place of the 119th Congress boundaries. The proposed maps were passed by the
            General Assembly and signed by Governor Spanberger in February 2026, and now go to
            voters for final approval. A <strong>yes</strong> vote adopts the new, fairer maps
            for the 2026 elections.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">Why is this happening?</h2>
          <p>
            The current congressional maps fragment real communities — especially in Northern and
            Central Virginia — splitting cities, counties, and regional corridors across multiple
            districts to protect incumbents. The proposed maps fix that. They keep communities of
            interest together and make several long-safe districts genuinely competitive, giving
            Virginians meaningful choices instead of predetermined outcomes.
          </p>
          <p>
            Checks and balances only work when maps are drawn for people, not politicians. As
            other states push more extreme gerrymanders, Virginia has a chance to stand up for
            fair representation — and this referendum is how we do it.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">Key dates</h2>
          <ul className="space-y-2">
            <li>
              <strong>March 6, 2026:</strong> Early voting opens at local registrar offices.
            </li>
            <li>
              <strong>April 11, 2026:</strong> Deadline to request an absentee ballot by mail.
            </li>
            <li>
              <strong>April 19, 2026:</strong> Last day of early in-person voting.
            </li>
            <li>
              <strong>April 21, 2026:</strong> Referendum Election Day (polls 6am–7pm).
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">
            How do the new maps compare to the old ones?
          </h2>
          <p>
            The largest changes are in the <Link href="/districts/7">7th District</Link>, which is
            almost entirely rewritten, and in the{" "}
            <Link href="/districts/1">1st</Link>, <Link href="/districts/5">5th</Link>, and{" "}
            <Link href="/districts/6">6th</Link>, which all become significantly more competitive.
            Use our <Link href="/">district checker</Link> to see whether your own district
            changes, or browse the full list on our{" "}
            <Link href="/districts">all districts page</Link>.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">Where do I vote?</h2>
          <p>
            Your polling place doesn&apos;t change for this referendum — it&apos;s the same
            location you use for other Virginia elections. You can look yours up at{" "}
            <a
              href="https://www.elections.virginia.gov/registration/view-your-info/"
              target="_blank"
              rel="noopener"
            >
              elections.virginia.gov
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">What happens if it passes?</h2>
          <p>
            If the referendum passes, the proposed maps will take effect immediately for the
            November 2026 congressional elections. Every U.S. House race in Virginia will be run on
            the new district lines, and several current incumbents will find themselves in very
            different districts than the ones they currently represent.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">
            What happens if it fails?
          </h2>
          <p>
            If voters reject the referendum, Virginia will continue using the 119th Congress map
            for the 2026 election, and the state&apos;s next scheduled redistricting would happen
            after the 2030 census.
          </p>
        </article>

        <div className="max-w-3xl mx-auto mt-12 bg-gray-50 rounded-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-[#1B3A5C] mb-2">Get referendum updates</h3>
          <p className="text-gray-600 mb-4">
            We&apos;ll send you a reminder before Election Day and notify you of any changes to
            the maps or voting rules.
          </p>
          <EmailSignup />
        </div>
      </main>
      <Footer />
    </div>
  );
}
