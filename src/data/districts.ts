// Virginia congressional district metadata
// Proposed maps = from the 2026 mid-decade redistricting proposal
// Current maps = 119th Congress districts

export interface DistrictInfo {
  id: number;
  currentRep: string;
  currentParty: "D" | "R";
  proposedLean: "D" | "R" | "Tossup";
  proposedDemPct: number;
  proposedRepPct: number;
  region: string;
  majorAreas: string[];
  summary: string;
  proposedChanges: string;
}

export const districts: DistrictInfo[] = [
  {
    id: 1,
    currentRep: "Rob Wittman",
    currentParty: "R",
    proposedLean: "D",
    proposedDemPct: 52.45,
    proposedRepPct: 44.93,
    region: "Tidewater & Northern Neck",
    majorAreas: ["Fredericksburg", "Stafford", "King George", "Northern Neck", "Middle Peninsula"],
    summary:
      "Virginia's 1st Congressional District covers the Northern Neck, Middle Peninsula, and parts of the Fredericksburg region along the Chesapeake Bay.",
    proposedChanges:
      "The proposed 1st District shifts north to unite Fredericksburg, Stafford, and parts of Prince William County with the Northern Neck — turning a long-safe incumbent seat into a genuinely competitive district where voters actually get to decide.",
  },
  {
    id: 2,
    currentRep: "Jen Kiggans",
    currentParty: "R",
    proposedLean: "Tossup",
    proposedDemPct: 49.83,
    proposedRepPct: 48.55,
    region: "Hampton Roads",
    majorAreas: ["Virginia Beach", "Chesapeake", "Suffolk", "Eastern Shore"],
    summary:
      "The 2nd District covers Virginia Beach and Eastern Shore communities — a historically Republican Hampton Roads seat with a large military population.",
    proposedChanges:
      "The proposed 2nd District becomes one of the most competitive in the country, with Democrats picking up about a point. Expect a marquee 2026 race.",
  },
  {
    id: 3,
    currentRep: "Bobby Scott",
    currentParty: "D",
    proposedLean: "D",
    proposedDemPct: 64.58,
    proposedRepPct: 33.65,
    region: "Hampton Roads",
    majorAreas: ["Norfolk", "Newport News", "Hampton", "Portsmouth"],
    summary:
      "The 3rd District anchors Hampton Roads, covering Norfolk, Newport News, Hampton, and Portsmouth — a majority-minority Democratic stronghold.",
    proposedChanges:
      "The proposed 3rd remains a safe Democratic seat and keeps Hampton Roads' core cities together, strengthening community-of-interest ties.",
  },
  {
    id: 4,
    currentRep: "Jennifer McClellan",
    currentParty: "D",
    proposedLean: "D",
    proposedDemPct: 57.19,
    proposedRepPct: 41.31,
    region: "Central Virginia",
    majorAreas: ["Richmond", "Petersburg", "Chesterfield", "Emporia"],
    summary:
      "The 4th District centers on Richmond and runs south through Petersburg and Emporia — a reliably Democratic seat currently held by Jennifer McClellan.",
    proposedChanges:
      "The proposed 4th keeps Richmond whole and absorbs more of Chesterfield County, solidifying it as a comfortably Democratic district.",
  },
  {
    id: 5,
    currentRep: "John McGuire",
    currentParty: "R",
    proposedLean: "D",
    proposedDemPct: 53.34,
    proposedRepPct: 44.81,
    region: "Central & Piedmont",
    majorAreas: ["Charlottesville", "Lynchburg", "Albemarle", "Danville"],
    summary:
      "The 5th District stretches across the Piedmont, anchored by Charlottesville, Albemarle County, and Lynchburg.",
    proposedChanges:
      "The proposed 5th keeps Charlottesville and Albemarle whole instead of splitting them, and becomes a genuinely competitive district where voters — not mapmakers — decide the outcome.",
  },
  {
    id: 6,
    currentRep: "Ben Cline",
    currentParty: "R",
    proposedLean: "D",
    proposedDemPct: 50.60,
    proposedRepPct: 47.53,
    region: "Shenandoah Valley",
    majorAreas: ["Roanoke", "Lynchburg area", "Shenandoah Valley", "Staunton", "Harrisonburg"],
    summary:
      "The 6th District runs through the Shenandoah Valley from Winchester to Roanoke — historically one of Virginia's most Republican districts.",
    proposedChanges:
      "The proposed 6th unites Roanoke and Harrisonburg with the Shenandoah Valley and becomes genuinely competitive — ending decades of predetermined outcomes in one of Virginia's largest regions.",
  },
  {
    id: 7,
    currentRep: "Eugene Vindman",
    currentParty: "D",
    proposedLean: "D",
    proposedDemPct: 52.80,
    proposedRepPct: 44.80,
    region: "Northern & Central Virginia",
    majorAreas: [
      "North Arlington",
      "Falls Church",
      "Central Fairfax",
      "Culpeper",
      "Orange",
      "Augusta",
    ],
    summary:
      "The 7th District is the most dramatically redrawn district in the proposal. It now stitches together North Arlington, Falls Church, and central Fairfax with a corridor running south through Culpeper to Augusta County.",
    proposedChanges:
      "The proposed 7th is completely different from Eugene Vindman's current district. It loses Fredericksburg, Spotsylvania, Stafford, and Prince William entirely, and picks up Arlington/Falls Church in the north and a Central Virginia corridor in the south.",
  },
  {
    id: 8,
    currentRep: "Don Beyer",
    currentParty: "D",
    proposedLean: "D",
    proposedDemPct: 57.61,
    proposedRepPct: 40.07,
    region: "Northern Virginia",
    majorAreas: ["Alexandria", "South Arlington", "Mount Vernon", "Eastern Fairfax"],
    summary:
      "The 8th District covers Alexandria, South Arlington, and eastern Fairfax County — one of the most Democratic districts in Virginia.",
    proposedChanges:
      "The proposed 8th shifts slightly southward, giving up North Arlington to District 7 while maintaining its Democratic stronghold status.",
  },
  {
    id: 9,
    currentRep: "Morgan Griffith",
    currentParty: "R",
    proposedLean: "R",
    proposedDemPct: 24.97,
    proposedRepPct: 73.96,
    region: "Southwest Virginia",
    majorAreas: ["Bristol", "Abingdon", "Wise", "Tazewell", "Galax"],
    summary:
      "The 9th District covers Southwest Virginia — coal country, the mountains, and Bristol. It remains the state's most Republican seat.",
    proposedChanges:
      "The proposed 9th cleanly unites Southwest Virginia — coal country, the mountains, and Bristol — keeping a genuine community of interest together instead of splitting it across districts to protect incumbents elsewhere.",
  },
  {
    id: 10,
    currentRep: "Suhas Subramanyam",
    currentParty: "D",
    proposedLean: "D",
    proposedDemPct: 54.59,
    proposedRepPct: 42.18,
    region: "Northern Virginia",
    majorAreas: ["Loudoun", "Western Fairfax", "Winchester", "Leesburg"],
    summary:
      "The 10th District covers Loudoun County, western Fairfax, and Winchester — a rapidly growing, Democratic-leaning NoVA exurb district.",
    proposedChanges:
      "The proposed 10th consolidates Loudoun and western Fairfax, maintaining its competitive-Democratic profile.",
  },
  {
    id: 11,
    currentRep: "Gerry Connolly",
    currentParty: "D",
    proposedLean: "D",
    proposedDemPct: 55.25,
    proposedRepPct: 41.83,
    region: "Northern Virginia",
    majorAreas: ["Fairfax", "Fairfax City", "Burke", "Springfield"],
    summary:
      "The 11th District covers most of Fairfax County — suburban Northern Virginia and a safely Democratic seat.",
    proposedChanges:
      "The proposed 11th stays mostly intact with Fairfax County as its anchor, adjusting boundaries modestly to keep population balanced.",
  },
];

export function getDistrict(id: number): DistrictInfo | undefined {
  return districts.find((d) => d.id === id);
}
