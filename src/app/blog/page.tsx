import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "Why Redistricting Matters for Virginia | Virginia Redistricting Checker",
  description:
    "Gerrymandering has shaped Virginia's politics for decades. Here's why the new proposed maps are a step toward fairer representation.",
  alternates: {
    canonical: "https://vadistricts.org/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <article className="max-w-3xl mx-auto prose prose-lg prose-slate">
          <h1 className="text-4xl font-bold text-[#1B3A5C] mb-2">
            Why Redistricting Matters for Virginia
          </h1>
          <p className="text-gray-500 text-sm mb-8">March 2025 · 5 min read</p>

          <p>
            Every ten years, the lines that define America&apos;s congressional districts get redrawn. In theory, this process ensures that as populations shift, each district maintains roughly equal representation. In practice, it&apos;s been one of the most abused tools in American politics — and Virginia has been at the center of that story for decades.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">The Gerrymander&apos;s Grip</h2>
          <p>
            The term &ldquo;gerrymandering&rdquo; dates back to 1812, but its modern incarnation is far more precise and far more damaging. With advanced mapping software, legislators can draw districts that virtually guarantee outcomes — packing opponents into a few districts or cracking their communities across many, diluting their power.
          </p>
          <p>
            Virginia has experienced both. For years, the state&apos;s congressional map featured districts that snaked through disconnected communities, splitting counties and cities to serve partisan interests rather than the people who live there. The result? Elections where outcomes were predetermined, representatives who answered to party bosses instead of constituents, and communities that lost their collective voice.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">The Gerrymandering Arms Race</h2>
          <p>
            Right now, Republicans are waging an unprecedented gerrymandering campaign across the country — and they&apos;re winning. In Texas, Republican legislators drew maps so extreme that millions of voters of color were packed into a handful of districts while safe Republican seats multiplied. In North Carolina, the GOP legislature overrode courts and a Democratic governor to ram through maps that turned a competitive state into a near-permanent Republican supermajority. Ohio voters passed anti-gerrymandering reforms <em>twice</em>, and Republican mapmakers ignored them both times. In Florida, Governor DeSantis personally redrew the congressional map to eliminate a Black-majority district that had existed for three decades.
          </p>
          <p>
            This isn&apos;t happening by accident. Donald Trump has openly told Republican state legislators to gerrymander aggressively, and they&apos;re listening. The result is a system with no checks and balances — where one party can lock in power regardless of how people actually vote. The Supreme Court ruled in <em>Rucho v. Common Cause</em> that federal courts can&apos;t even hear partisan gerrymandering cases, leaving voters with essentially no recourse.
          </p>
          <p>
            Meanwhile, Democrats in many states have refused to respond in kind, unilaterally disarming while their opponents redraw the country out from under them. If this continues, Democrats risk being gerrymandered into permanent minority status — not because they lack voters, but because the maps won&apos;t let those voters matter.
          </p>
          <p>
            Virginia has a chance to be different. Instead of letting politicians in other states decide what Virginia&apos;s representation looks like, Virginians can step up and demand maps that actually reflect their communities. Fair maps aren&apos;t just about one party or the other — they&apos;re about making sure that Virginia voices are counted and heard, instead of being diluted and taken advantage of by a national partisan machine.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">Why It Matters to You</h2>
          <p>
            You might wonder: does it really matter which lines are drawn on a map? The answer is unequivocal. Your congressional district determines who represents you in Washington. It shapes which issues get attention, which communities get resources, and whose voices are heard.
          </p>
          <p>
            When districts are gerrymandered, representatives don&apos;t need to appeal to a broad base of voters. They can focus solely on their partisan base, leading to more extreme positions and less willingness to compromise. Fair districts force representatives to actually represent — to listen to diverse perspectives and find common ground.
          </p>

          <h2 className="text-2xl font-bold text-[#1B3A5C] mt-10 mb-4">The Bigger Picture</h2>
          <p>
            Redistricting reform isn&apos;t a partisan issue — it&apos;s a democratic one. Voters should choose their representatives, not the other way around. When maps are drawn fairly, elections become more competitive, turnout increases, and elected officials are more responsive to the people they serve.
          </p>
          <p>
            Virginia has a chance to get this right. The proposed maps aren&apos;t perfect — no map is — but they represent a genuine effort to create districts that serve voters rather than politicians. Whether you&apos;re a Democrat, Republican, or independent, you deserve a representative who has to earn your vote.
          </p>
          <p>
            Check your address on our <a href="/" className="text-[#1B3A5C] font-semibold underline">district checker tool</a> to see how the proposed maps affect your representation. And if you believe in fair maps, make your voice heard.
          </p>
        </article>

        <div className="max-w-3xl mx-auto mt-12 bg-gray-50 rounded-xl p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-[#1B3A5C] mb-2">Stay Informed</h3>
          <p className="text-gray-600 mb-4">Get updates on Virginia&apos;s redistricting process.</p>
          <EmailSignup />
        </div>
      </main>
      <Footer />
    </div>
  );
}
