/**
 * Product catalog. Single source of truth for all GPS fishing map regions.
 *
 * To add a new region:
 *  1. Add a new entry below.
 *  2. Drop the format-specific files into Vercel Blob (paths matching `files`).
 *  3. The shop, sitemap, schema, OG, and checkout all update automatically.
 */

export type ChartplotterFormat =
  | "garmin"
  | "lowrance"
  | "humminbird"
  | "simrad"
  | "raymarine"
  | "furuno"
  | "navionics-mobile"
  | "google-earth";

export interface FormatInfo {
  id: ChartplotterFormat;
  label: string;
  extension: string;
  description: string;
}

export const FORMAT_CATALOG: Record<ChartplotterFormat, FormatInfo> = {
  garmin: {
    id: "garmin",
    label: "Garmin",
    extension: ".gpx",
    description: "Works with all modern Garmin chartplotters and handhelds.",
  },
  lowrance: {
    id: "lowrance",
    label: "Lowrance",
    extension: ".usr",
    description: "Lowrance HDS, Elite, Hook² and HOOK Reveal.",
  },
  humminbird: {
    id: "humminbird",
    label: "Humminbird",
    extension: ".gpx",
    description: "All Helix, Solix, Apex, and Onix series.",
  },
  simrad: {
    id: "simrad",
    label: "Simrad",
    extension: ".usr",
    description: "Simrad NSS, NSO, GO and Cruise series.",
  },
  raymarine: {
    id: "raymarine",
    label: "Raymarine",
    extension: ".gpx",
    description: "Axiom, eS Series, Element and Dragonfly.",
  },
  furuno: {
    id: "furuno",
    label: "Furuno",
    extension: ".gpx",
    description: "TZtouch2, TZtouch3 and NavNet.",
  },
  "navionics-mobile": {
    id: "navionics-mobile",
    label: "Navionics App (iOS / Android)",
    extension: ".gpx",
    description: "Import directly into the Navionics Boating app.",
  },
  "google-earth": {
    id: "google-earth",
    label: "Google Earth",
    extension: ".kmz",
    description: "View, plan, and share your spots on any device.",
  },
};

export interface RegionProduct {
  slug: string;
  name: string;
  shortName: string;
  region: "east-coast" | "gulf-coast" | "keys" | "panhandle" | "statewide";
  city: string;
  county: string;
  priceCents: number;
  spotCount: number;
  inshoreCount: number;
  offshoreCount: number;
  reefCount: number;
  wreckCount: number;
  description: string;
  longDescription: string;
  speciesTargets: string[];
  launchPoints: string[];
  featured?: boolean;
  // file paths inside Vercel Blob, by format. Filled in once Danny uploads.
  files: Partial<Record<ChartplotterFormat, string>>;
  heroImage: string;
  // GEO: lat/lng of region center for LocalBusiness / map embeds
  center: { lat: number; lng: number };
  faqs: { q: string; a: string }[];
}

const HERO_DEFAULT =
  "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1600&q=80";

export const PRODUCTS: RegionProduct[] = [
  {
    slug: "florida-keys",
    name: "Florida Keys GPS Fishing Maps",
    shortName: "Florida Keys",
    region: "keys",
    city: "Key West",
    county: "Monroe",
    priceCents: 9999,
    spotCount: 312,
    inshoreCount: 118,
    offshoreCount: 124,
    reefCount: 48,
    wreckCount: 22,
    description:
      "312 proven GPS spots across the Upper, Middle and Lower Keys. Reefs, wrecks, humps, ledges, and backcountry flats.",
    longDescription:
      "From Key Largo to the Marquesas, this map pack covers every productive fishing zone in the Florida Keys. Includes the deep wrecks south of Key West where the muttons and groupers stack, the famous humps that hold tuna and wahoo year-round, the patch reefs of Hawk Channel for snapper and yellowtail, and the backcountry flats around Islamorada for tarpon, permit and bonefish. Each spot has been verified by local captains over multiple seasons.",
    speciesTargets: [
      "Yellowtail Snapper",
      "Mutton Snapper",
      "Black Grouper",
      "Permit",
      "Tarpon",
      "Mahi-Mahi",
      "Wahoo",
      "Sailfish",
      "Bonefish",
    ],
    launchPoints: [
      "Key Largo",
      "Islamorada",
      "Marathon",
      "Big Pine Key",
      "Key West",
    ],
    featured: true,
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 24.5551, lng: -81.7800 },
    faqs: [
      {
        q: "Are these spots good year-round?",
        a: "Yes. The Keys fish year-round and we've separated the spots into seasonal patterns inside the documentation that comes with your download.",
      },
      {
        q: "Do these include the deep drop spots south of Key West?",
        a: "Yes — 22 deep drop locations from 600-1,200 ft for snowy grouper, queen snapper and tilefish are included.",
      },
    ],
  },
  {
    slug: "tampa-bay",
    name: "Tampa Bay GPS Fishing Maps",
    shortName: "Tampa Bay",
    region: "gulf-coast",
    city: "Tampa",
    county: "Hillsborough",
    priceCents: 7999,
    spotCount: 218,
    inshoreCount: 142,
    offshoreCount: 56,
    reefCount: 14,
    wreckCount: 6,
    description:
      "218 spots covering Tampa Bay, the Skyway, near-shore Gulf, and artificial reefs out to 30 miles.",
    longDescription:
      "The Tampa Bay map pack spans the entire estuary and adjacent Gulf — from the upper bay around the Alafia and Hillsborough rivers, down to the Skyway pilings, the Egmont Key channel, and the artificial reefs off St. Petersburg and Pinellas. Snook, redfish and trout dominate the inshore set; the near-shore reefs hold mangrove snapper, gag grouper, hogfish and king mackerel.",
    speciesTargets: [
      "Snook",
      "Redfish",
      "Spotted Seatrout",
      "Tarpon",
      "Gag Grouper",
      "Mangrove Snapper",
      "Hogfish",
      "King Mackerel",
    ],
    launchPoints: ["St. Petersburg", "Tampa", "Apollo Beach", "Ruskin", "Bradenton"],
    featured: true,
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 27.7634, lng: -82.5665 },
    faqs: [
      {
        q: "Does this cover Boca Ciega Bay?",
        a: "Yes — the western shore from Pass-a-Grille up through Madeira Beach is included.",
      },
    ],
  },
  {
    slug: "miami-offshore",
    name: "Miami Offshore GPS Fishing Maps",
    shortName: "Miami Offshore",
    region: "east-coast",
    city: "Miami",
    county: "Miami-Dade",
    priceCents: 8999,
    spotCount: 187,
    inshoreCount: 0,
    offshoreCount: 142,
    reefCount: 28,
    wreckCount: 17,
    description:
      "187 offshore spots from Government Cut to the edge of the Gulf Stream. Wrecks, reefs, humps, and ledges.",
    longDescription:
      "Miami's offshore fishing is world-class — and this map gets you on it fast. The pack includes every major wreck off Miami Beach, the second and third reef ledges, the deep humps where blue marlin push through in spring, and the kingfish and sailfish trolling lanes from 80 to 400 feet of water.",
    speciesTargets: [
      "Sailfish",
      "Mahi-Mahi",
      "Wahoo",
      "Blackfin Tuna",
      "Kingfish",
      "Mutton Snapper",
      "Black Grouper",
      "Swordfish",
    ],
    launchPoints: ["Miami Beach", "Government Cut", "Haulover Inlet", "Crandon Park"],
    featured: true,
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 25.7617, lng: -80.1918 },
    faqs: [],
  },
  {
    slug: "panhandle",
    name: "Florida Panhandle GPS Fishing Maps",
    shortName: "Panhandle",
    region: "panhandle",
    city: "Destin",
    county: "Okaloosa",
    priceCents: 8999,
    spotCount: 246,
    inshoreCount: 78,
    offshoreCount: 124,
    reefCount: 32,
    wreckCount: 12,
    description:
      "246 spots from Pensacola to Apalachicola. Public reefs, private numbers, and inshore haunts.",
    longDescription:
      "The Panhandle map covers Pensacola, Navarre, Destin, Panama City, and Apalachicola Bay. Hundreds of artificial reefs and natural bottom — red snapper, amberjack, gag grouper, triggerfish — plus the inshore creeks and grass beds that hold reds and trout.",
    speciesTargets: [
      "Red Snapper",
      "Gag Grouper",
      "Amberjack",
      "Triggerfish",
      "Cobia",
      "Spanish Mackerel",
      "Redfish",
      "Speckled Trout",
    ],
    launchPoints: ["Pensacola", "Destin", "Panama City", "Apalachicola"],
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 30.3935, lng: -86.4958 },
    faqs: [],
  },
  {
    slug: "jacksonville",
    name: "Jacksonville & St. Augustine GPS Fishing Maps",
    shortName: "Jacksonville",
    region: "east-coast",
    city: "Jacksonville",
    county: "Duval",
    priceCents: 7999,
    spotCount: 164,
    inshoreCount: 92,
    offshoreCount: 58,
    reefCount: 10,
    wreckCount: 4,
    description:
      "164 spots from the St. Johns River to the offshore ledges and ARs of NE Florida.",
    longDescription:
      "Jacksonville's inshore is dominated by the St. Johns River and its tributaries — flounder, redfish, sheepshead, and trout. Offshore, the map covers the Nine Mile, the Elton Bottom, the M Reef, and many lesser-known ledges out to 18 fathoms.",
    speciesTargets: [
      "Redfish",
      "Flounder",
      "Sheepshead",
      "Speckled Trout",
      "Black Drum",
      "Mangrove Snapper",
      "Gag Grouper",
    ],
    launchPoints: ["Jacksonville", "Mayport", "St. Augustine", "Ponte Vedra"],
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 30.3322, lng: -81.6557 },
    faqs: [],
  },
  {
    slug: "everglades-10000-islands",
    name: "Everglades & 10,000 Islands GPS Fishing Maps",
    shortName: "Everglades & 10,000 Islands",
    region: "gulf-coast",
    city: "Naples",
    county: "Collier",
    priceCents: 6999,
    spotCount: 196,
    inshoreCount: 196,
    offshoreCount: 0,
    reefCount: 0,
    wreckCount: 0,
    description:
      "196 backcountry spots through the Everglades and 10,000 Islands. Snook, redfish, tarpon and snapper.",
    longDescription:
      "The Everglades and 10,000 Islands are a labyrinth — without local knowledge you'll burn a tank of gas finding fish. This map drops you on proven spots: oyster bars, hidden creeks, deep holes, and the productive points off Chokoloskee, Everglades City, and Marco. Every spot has notes on tide and time of year.",
    speciesTargets: ["Snook", "Redfish", "Tarpon", "Speckled Trout", "Sheepshead", "Mangrove Snapper"],
    launchPoints: ["Marco Island", "Goodland", "Everglades City", "Chokoloskee", "Flamingo"],
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 25.8523, lng: -81.3870 },
    faqs: [],
  },
  {
    slug: "fort-lauderdale-palm-beach",
    name: "Fort Lauderdale & Palm Beach GPS Fishing Maps",
    shortName: "Fort Lauderdale & Palm Beach",
    region: "east-coast",
    city: "Fort Lauderdale",
    county: "Broward",
    priceCents: 8999,
    spotCount: 174,
    inshoreCount: 28,
    offshoreCount: 134,
    reefCount: 24,
    wreckCount: 18,
    description:
      "174 offshore spots between Hillsboro Inlet and Jupiter. Sailfish alley, wrecks, and reef ledges.",
    longDescription:
      "This is the heart of Florida's sailfish coast. The map includes the kite-fishing tracks from Boca Raton through Jupiter, the famous Lauderdale wrecks (Tracy, Mercedes, RBJ, Captain Dan), and the second and third reef ledges where muttons and snapper stack.",
    speciesTargets: ["Sailfish", "Mahi-Mahi", "Kingfish", "Wahoo", "Mutton Snapper", "Cobia", "Tuna"],
    launchPoints: ["Hillsboro Inlet", "Port Everglades", "Boca Inlet", "Jupiter Inlet"],
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 26.1224, lng: -80.1373 },
    faqs: [],
  },
  {
    slug: "indian-river-lagoon",
    name: "Indian River Lagoon GPS Fishing Maps",
    shortName: "Indian River Lagoon",
    region: "east-coast",
    city: "Stuart",
    county: "Martin",
    priceCents: 6999,
    spotCount: 158,
    inshoreCount: 158,
    offshoreCount: 0,
    reefCount: 0,
    wreckCount: 0,
    description:
      "158 inshore spots from Sebastian to Jupiter. Trout, snook, redfish, and gator-class trout grass flats.",
    longDescription:
      "The Indian River Lagoon system holds the largest gator trout in the state. This map covers the Mosquito Lagoon, the Banana River, and the IRL itself from Sebastian Inlet down through Stuart and Jupiter — including the Crossroads, where the St. Lucie meets the IRL.",
    speciesTargets: ["Spotted Seatrout", "Snook", "Redfish", "Tarpon", "Black Drum", "Sheepshead"],
    launchPoints: ["Sebastian Inlet", "Vero Beach", "Fort Pierce Inlet", "Stuart", "Jupiter"],
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 27.5311, lng: -80.4106 },
    faqs: [],
  },
  {
    slug: "florida-statewide-bundle",
    name: "Florida Statewide Bundle — Every GPS Map",
    shortName: "Statewide Bundle",
    region: "statewide",
    city: "Florida",
    county: "Statewide",
    priceCents: 39999,
    spotCount: 1855,
    inshoreCount: 812,
    offshoreCount: 838,
    reefCount: 156,
    wreckCount: 79,
    description:
      "Every region. Every spot. 1,855 GPS coordinates across the entire state of Florida — over 50% off vs. buying separately.",
    longDescription:
      "Buy every regional map at once and save. The Statewide Bundle includes the Keys, Tampa Bay, Miami, the Panhandle, Jacksonville, the Everglades, Fort Lauderdale, and the Indian River Lagoon — 1,855 GPS-verified spots covering inshore, offshore, reefs, wrecks and ledges. The same chartplotter format pack you'd choose for a single region applies to the entire bundle.",
    speciesTargets: ["Every species in Florida"],
    launchPoints: ["Statewide"],
    featured: true,
    files: {},
    heroImage: HERO_DEFAULT,
    center: { lat: 27.6648, lng: -81.5158 },
    faqs: [
      {
        q: "Do I get one big file or one file per region?",
        a: "You get one file per region in your chosen format, plus a combined file containing every spot — so you can load them as separate folders on your chartplotter or as one big set.",
      },
    ],
  },
];

export function getProduct(slug: string): RegionProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeatured(): RegionProduct[] {
  return PRODUCTS.filter((p) => p.featured);
}
