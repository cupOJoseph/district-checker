import Image from "next/image";

interface CandidateCardProps {
  className?: string;
}

export default function CandidateCard({ className = "" }: CandidateCardProps) {
  return (
    <div
      className={`bg-white border-2 border-[#1B3A5C] rounded-xl p-6 ${className}`}
    >
      <div className="flex items-start gap-5">
        <Image
          src="/joe-schiarizzi.jpg"
          alt="Joe Schiarizzi"
          width={100}
          height={100}
          className="rounded-full object-cover flex-shrink-0"
        />
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-[#1B3A5C]">
            Joe Schiarizzi is running in VA-7
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Joe is an inventor, affordable housing activist, and clean energy investor
            running for Congress in Virginia&apos;s new 7th District. He chaired the
            Falls Church Environmental Sustainability Council and founded Solarpunk VC.
          </p>
          <a
            href="https://www.votejoe.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-5 py-2.5 bg-[#1B3A5C] text-white rounded-lg font-semibold hover:bg-[#0f2640] transition-colors text-sm"
          >
            Learn More at votejoe.org →
          </a>
        </div>
      </div>
    </div>
  );
}
