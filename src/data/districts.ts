// Virginia congressional district metadata
// Virginia congressional district metadata for the current map.

export interface DistrictInfo {
  id: number;
  currentRep: string;
  currentParty: "D" | "R";
  lean: "D" | "R" | "Tossup";
  demPct: number;
  repPct: number;
  region: string;
  majorAreas: string[];
  summary: string;
  profile: string;
}

export const districts: DistrictInfo[] = [
  {
    id: 1,
    currentRep: "Rob Wittman",
    currentParty: "R",
    lean: "D",
    demPct: 52.45,
    repPct: 44.93,
    region: "Tidewater & Northern Neck",
    majorAreas: ["Fredericksburg", "Stafford", "King George", "Northern Neck", "Middle Peninsula"],
    summary:
      "Virginia's 1st Congressional District covers the Northern Neck, Middle Peninsula, and parts of the Fredericksburg region along the Chesapeake Bay.",
    profile:
      "The 1st District unites Fredericksburg, Stafford, and parts of Prince William County with the Northern Neck, creating a competitive Tidewater and Northern Neck seat.",
  },
  {
    id: 2,
    currentRep: "Jen Kiggans",
    currentParty: "R",
    lean: "Tossup",
    demPct: 49.83,
    repPct: 48.55,
    region: "Hampton Roads",
    majorAreas: ["Virginia Beach", "Chesapeake", "Suffolk", "Eastern Shore"],
    summary:
      "The 2nd District covers Virginia Beach and Eastern Shore communities — a historically Republican Hampton Roads seat with a large military population.",
    profile:
      "The 2nd District is one of Virginia's most competitive seats, centered on Hampton Roads communities with a large military population.",
  },
  {
    id: 3,
    currentRep: "Bobby Scott",
    currentParty: "D",
    lean: "D",
    demPct: 64.58,
    repPct: 33.65,
    region: "Hampton Roads",
    majorAreas: ["Norfolk", "Newport News", "Hampton", "Portsmouth"],
    summary:
      "The 3rd District anchors Hampton Roads, covering Norfolk, Newport News, Hampton, and Portsmouth — a majority-minority Democratic stronghold.",
    profile:
      "The 3rd District remains a safe Democratic seat anchored by Hampton Roads' core cities.",
  },
  {
    id: 4,
    currentRep: "Jennifer McClellan",
    currentParty: "D",
    lean: "D",
    demPct: 57.19,
    repPct: 41.31,
    region: "Central Virginia",
    majorAreas: ["Richmond", "Petersburg", "Chesterfield", "Emporia"],
    summary:
      "The 4th District centers on Richmond and runs south through Petersburg and Emporia — a reliably Democratic seat currently held by Jennifer McClellan.",
    profile:
      "The 4th District keeps Richmond as its anchor and includes surrounding Central Virginia communities, making it a comfortably Democratic district.",
  },
  {
    id: 5,
    currentRep: "John McGuire",
    currentParty: "R",
    lean: "D",
    demPct: 53.34,
    repPct: 44.81,
    region: "Central & Piedmont",
    majorAreas: ["Charlottesville", "Lynchburg", "Albemarle", "Danville"],
    summary:
      "The 5th District stretches across the Piedmont, anchored by Charlottesville, Albemarle County, and Lynchburg.",
    profile:
      "The 5th District is a competitive Central Virginia and Piedmont seat anchored by Charlottesville, Albemarle County, and Lynchburg.",
  },
  {
    id: 6,
    currentRep: "Ben Cline",
    currentParty: "R",
    lean: "D",
    demPct: 50.60,
    repPct: 47.53,
    region: "Shenandoah Valley",
    majorAreas: ["Roanoke", "Lynchburg area", "Shenandoah Valley", "Staunton", "Harrisonburg"],
    summary:
      "The 6th District runs through the Shenandoah Valley from Winchester to Roanoke — historically one of Virginia's most Republican districts.",
    profile:
      "The 6th District includes Roanoke, Harrisonburg, and the Shenandoah Valley, making it a competitive district across one of Virginia's largest regions.",
  },
  {
    id: 7,
    currentRep: "Eugene Vindman",
    currentParty: "D",
    lean: "D",
    demPct: 52.80,
    repPct: 44.80,
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
      "The 7th District connects North Arlington, Falls Church, and central Fairfax with a corridor running south through Culpeper to Augusta County.",
    profile:
      "The 7th District is a Northern and Central Virginia seat, combining dense inner-suburban communities with a Central Virginia corridor.",
  },
  {
    id: 8,
    currentRep: "Don Beyer",
    currentParty: "D",
    lean: "D",
    demPct: 57.61,
    repPct: 40.07,
    region: "Northern Virginia",
    majorAreas: ["Alexandria", "South Arlington", "Mount Vernon", "Eastern Fairfax"],
    summary:
      "The 8th District covers Alexandria, South Arlington, and eastern Fairfax County — one of the most Democratic districts in Virginia.",
    profile:
      "The 8th District remains a Democratic stronghold centered on Alexandria, South Arlington, and eastern Fairfax County.",
  },
  {
    id: 9,
    currentRep: "Morgan Griffith",
    currentParty: "R",
    lean: "R",
    demPct: 24.97,
    repPct: 73.96,
    region: "Southwest Virginia",
    majorAreas: ["Bristol", "Abingdon", "Wise", "Tazewell", "Galax"],
    summary:
      "The 9th District covers Southwest Virginia — coal country, the mountains, and Bristol. It remains the state's most Republican seat.",
    profile:
      "The 9th District covers Southwest Virginia — coal country, the mountains, and Bristol — and remains the state's most Republican seat.",
  },
  {
    id: 10,
    currentRep: "Suhas Subramanyam",
    currentParty: "D",
    lean: "D",
    demPct: 54.59,
    repPct: 42.18,
    region: "Northern Virginia",
    majorAreas: ["Loudoun", "Western Fairfax", "Winchester", "Leesburg"],
    summary:
      "The 10th District covers Loudoun County, western Fairfax, and Winchester — a rapidly growing, Democratic-leaning NoVA exurb district.",
    profile:
      "The 10th District is anchored by Loudoun County, western Fairfax, and Winchester, with a competitive-Democratic profile.",
  },
  {
    id: 11,
    currentRep: "Gerry Connolly",
    currentParty: "D",
    lean: "D",
    demPct: 55.25,
    repPct: 41.83,
    region: "Northern Virginia",
    majorAreas: ["Fairfax", "Fairfax City", "Burke", "Springfield"],
    summary:
      "The 11th District covers most of Fairfax County — suburban Northern Virginia and a safely Democratic seat.",
    profile:
      "The 11th District is anchored by Fairfax County and remains a safely Democratic Northern Virginia seat.",
  },
];

export function getDistrict(id: number): DistrictInfo | undefined {
  return districts.find((d) => d.id === id);
}
