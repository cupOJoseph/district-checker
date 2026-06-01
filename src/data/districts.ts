// Virginia congressional district metadata for the current 119th Congress map.

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
    lean: "R",
    demPct: 42,
    repPct: 56,
    region: "Tidewater, Northern Neck & Richmond exurbs",
    majorAreas: ["Northern Neck", "Middle Peninsula", "Williamsburg", "Hanover", "New Kent"],
    summary: "Virginia's 1st Congressional District covers the Northern Neck, Middle Peninsula, Williamsburg area, and Richmond-area exurbs.",
    profile: "The 1st District is a Republican-leaning district anchored by coastal and exurban communities along the Chesapeake Bay and north of Richmond.",
  },
  {
    id: 2,
    currentRep: "Jen Kiggans",
    currentParty: "R",
    lean: "Tossup",
    demPct: 49,
    repPct: 50,
    region: "Hampton Roads & Eastern Shore",
    majorAreas: ["Virginia Beach", "Chesapeake", "Suffolk", "Isle of Wight", "Eastern Shore"],
    summary: "The 2nd District covers Virginia Beach, the Eastern Shore, and parts of South Hampton Roads.",
    profile: "The 2nd District is one of Virginia's most competitive congressional seats, with a large military and veteran population.",
  },
  {
    id: 3,
    currentRep: "Bobby Scott",
    currentParty: "D",
    lean: "D",
    demPct: 67,
    repPct: 31,
    region: "Hampton Roads",
    majorAreas: ["Norfolk", "Newport News", "Hampton", "Portsmouth", "Chesapeake"],
    summary: "The 3rd District anchors Hampton Roads, including Norfolk, Newport News, Hampton, Portsmouth, and parts of Chesapeake.",
    profile: "The 3rd District is a safely Democratic, majority-minority Hampton Roads seat.",
  },
  {
    id: 4,
    currentRep: "Jennifer McClellan",
    currentParty: "D",
    lean: "D",
    demPct: 67,
    repPct: 32,
    region: "Richmond & Southside",
    majorAreas: ["Richmond", "Petersburg", "Hopewell", "Charles City", "Southside Virginia"],
    summary: "The 4th District is centered on Richmond and Petersburg and stretches through parts of Southside Virginia.",
    profile: "The 4th District is a safely Democratic district anchored by the Richmond metro area.",
  },
  {
    id: 5,
    currentRep: "John McGuire",
    currentParty: "R",
    lean: "R",
    demPct: 42,
    repPct: 57,
    region: "Central & Southside Virginia",
    majorAreas: ["Charlottesville", "Lynchburg", "Danville", "Farmville", "South Boston"],
    summary: "The 5th District stretches from Charlottesville and the Piedmont south toward Danville and the North Carolina border.",
    profile: "The 5th District is a Republican-leaning district that includes both university communities and rural Southside counties.",
  },
  {
    id: 6,
    currentRep: "Ben Cline",
    currentParty: "R",
    lean: "R",
    demPct: 37,
    repPct: 61,
    region: "Shenandoah Valley & Roanoke",
    majorAreas: ["Roanoke", "Lynchburg", "Harrisonburg", "Staunton", "Winchester"],
    summary: "The 6th District runs through the Shenandoah Valley and includes Roanoke, Lynchburg, Harrisonburg, Staunton, and Winchester.",
    profile: "The 6th District is a safely Republican district covering much of western Virginia's valley corridor.",
  },
  {
    id: 7,
    currentRep: "Eugene Vindman",
    currentParty: "D",
    lean: "Tossup",
    demPct: 51,
    repPct: 48,
    region: "Northern Virginia, Fredericksburg & Central Virginia",
    majorAreas: ["Prince William", "Stafford", "Spotsylvania", "Fredericksburg", "Culpeper"],
    summary: "The 7th District includes parts of Prince William County, the Fredericksburg region, and a Central Virginia corridor.",
    profile: "The 7th District is a competitive Northern and Central Virginia seat currently represented by Eugene Vindman.",
  },
  {
    id: 8,
    currentRep: "Don Beyer",
    currentParty: "D",
    lean: "D",
    demPct: 70,
    repPct: 28,
    region: "Northern Virginia",
    majorAreas: ["Arlington", "Alexandria", "Falls Church", "McLean", "Mount Vernon"],
    summary: "The 8th District covers Arlington, Alexandria, Falls Church, and nearby parts of Fairfax County.",
    profile: "The 8th District is a safely Democratic Northern Virginia seat.",
  },
  {
    id: 9,
    currentRep: "Morgan Griffith",
    currentParty: "R",
    lean: "R",
    demPct: 27,
    repPct: 71,
    region: "Southwest Virginia",
    majorAreas: ["Bristol", "Abingdon", "Wise", "Tazewell", "Blacksburg"],
    summary: "The 9th District covers Southwest Virginia, from the coalfields and mountains to the New River Valley.",
    profile: "The 9th District is Virginia's most Republican congressional district.",
  },
  {
    id: 10,
    currentRep: "Suhas Subramanyam",
    currentParty: "D",
    lean: "D",
    demPct: 57,
    repPct: 41,
    region: "Northern Virginia exurbs",
    majorAreas: ["Loudoun", "Manassas", "Western Prince William", "Warrenton", "Winchester area"],
    summary: "The 10th District includes Loudoun County, Manassas, western Prince William, and parts of the northern Piedmont.",
    profile: "The 10th District is a Democratic-leaning Northern Virginia and exurban seat.",
  },
  {
    id: 11,
    currentRep: "Gerry Connolly",
    currentParty: "D",
    lean: "D",
    demPct: 67,
    repPct: 31,
    region: "Fairfax County",
    majorAreas: ["Fairfax", "Fairfax City", "Reston", "Herndon", "Annandale"],
    summary: "The 11th District is anchored by Fairfax County and Fairfax City in Northern Virginia.",
    profile: "The 11th District is a safely Democratic Fairfax-based seat.",
  },
];

export function getDistrict(id: number): DistrictInfo | undefined {
  return districts.find((d) => d.id === id);
}
