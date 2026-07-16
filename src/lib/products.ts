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
    extension: ".adm",
    description:
      "Native .adm card file for Garmin ECHOMAP and GPSMAP units. A universal .gpx is also included in your download.",
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
    extension: ".HWR",
    description: "Native .HWR file for all Helix, Solix, Apex, and Onix series.",
  },
  simrad: {
    id: "simrad",
    label: "Simrad",
    extension: ".gpx",
    description: "GPX import for Simrad NSS, NSO, GO and Cruise series.",
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

export type ProductStatus = "live" | "coming-soon";

export interface RegionProduct {
  slug: string;
  name: string;
  shortName: string;
  region:
    | "east-coast"
    | "gulf-coast"
    | "keys"
    | "panhandle"
    | "south-florida"
    | "statewide";
  city: string;
  county: string;
  /**
   * "live" — deliverable files exist and are uploaded; product is purchasable.
   * "coming-soon" — region is being charted; page renders a no-purchase
   * preview state and checkout rejects the slug server-side.
   */
  status: ProductStatus;
  /** True for multi-region bundle SKUs (excluded from per-region totals). */
  isBundle?: boolean;
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
  // Curated, license-clean location photos shown on the product page.
  // Optional: pages render no gallery until photos are added.
  gallery?: { src: string; alt: string; credit?: string }[];
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
    status: "live",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1576017454374-e24271593475?auto=format&fit=crop&w=1200&q=80",
        alt: "Golden hour water and dock scenery in Islamorada, Florida Keys",
        credit: "Catherine / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1697490600572-9e0b2c1eefea?auto=format&fit=crop&w=900&q=80",
        alt: "Sailboat on the ocean at sunset near Key West",
        credit: "Tim Nichols / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1669639785616-3353f0f11de7?auto=format&fit=crop&w=900&q=80",
        alt: "Key West beach sunset with palms and open water",
        credit: "Christopher Osten / Unsplash",
      },
    ],
    center: { lat: 24.5551, lng: -81.7800 },
    faqs: [
      {
        q: "How soon will I get the Keys maps after paying?",
        a: "Usually within minutes, and always within an hour. The download link is emailed automatically as soon as Stripe confirms your payment.",
      },
      {
        q: "Will the file load on my Garmin, Lowrance or Humminbird?",
        a: "Yes. You pick your brand at checkout and we send the matching format, plus a universal .gpx and a .kmz for Google Earth so you can plan on a laptop.",
      },
      {
        q: "Are these spots good year-round?",
        a: "Yes. The Keys fish year-round and the included documentation separates the spots into seasonal patterns so you know what's biting when.",
      },
      {
        q: "How do the 312 spots break down?",
        a: "118 inshore/backcountry spots for tarpon, permit and bonefish, 124 offshore including 48 reefs and 22 wrecks, plus the famous humps and ledges between.",
      },
      {
        q: "Do these include the deep drop spots south of Key West?",
        a: "Yes — deep drop locations from 600-1,200 ft for snowy grouper, queen snapper and tilefish are part of the offshore set.",
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
    status: "coming-soon",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1657373725182-6bb195badcbc?auto=format&fit=crop&w=1200&q=80",
        alt: "Kayak and sunset water scene in Tampa Bay",
        credit: "Anita Denunzio / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1646338176764-faab1329a915?auto=format&fit=crop&w=900&q=80",
        alt: "Fishing boat running across Tampa water",
        credit: "Taylor Daugherty / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1697819925284-6a5cef689f81?auto=format&fit=crop&w=900&q=80",
        alt: "Aerial view of St. Petersburg sand bars and blue water",
        credit: "Anita Denunzio / Unsplash",
      },
    ],
    center: { lat: 27.7634, lng: -82.5665 },
    faqs: [
      {
        q: "How fast is delivery, and how do I get the file?",
        a: "Within an hour of checkout — usually minutes. A download link is emailed automatically once payment clears.",
      },
      {
        q: "Which chartplotters are supported?",
        a: "All major brands — Garmin, Lowrance, Humminbird, Simrad, Raymarine and Furuno — plus the Navionics app and Google Earth. You choose your unit at checkout.",
      },
      {
        q: "Does this cover Boca Ciega Bay?",
        a: "Yes — the western shore from Pass-a-Grille up through Madeira Beach is included.",
      },
      {
        q: "Are the inshore spots tide-specific?",
        a: "Yes. The 142 inshore spots come with notes on the tide stage and season that fish each flat, pothole and dock line best for snook, redfish and trout.",
      },
      {
        q: "Do the offshore spots reach the grouper bottom?",
        a: "Yes — the near-shore reefs and hard bottom out to about 30 miles are included, where gag grouper, hogfish, mangrove snapper and kingfish hold.",
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
    status: "live",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1707803805432-ffb294d8027e?auto=format&fit=crop&w=1200&q=80",
        alt: "Boat offshore from Miami Beach with Atlantic water in view",
        credit: "Arnav Das / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1717940730787-23de9e6c1034?auto=format&fit=crop&w=900&q=80",
        alt: "White boat cutting through deep blue water off Miami",
        credit: "Dennis Zhang / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1741023705604-09d68b57e9b5?auto=format&fit=crop&w=900&q=80",
        alt: "Boats and Miami waterfront skyline",
        credit: "Walter Martin / Unsplash",
      },
    ],
    center: { lat: 25.7617, lng: -80.1918 },
    faqs: [
      {
        q: "How soon do I get the maps?",
        a: "Within an hour of checkout, usually minutes — the download link is emailed automatically after payment.",
      },
      {
        q: "Which chartplotter formats are included?",
        a: "Pick your brand at checkout (Garmin, Lowrance, Humminbird, Simrad, Raymarine, Furuno) and we send that format plus a universal .gpx and a .kmz for Google Earth.",
      },
      {
        q: "Is this offshore only?",
        a: "Yes — all 187 spots are offshore, from Government Cut to the edge of the Gulf Stream. There are no inshore or bay spots in this pack.",
      },
      {
        q: "What depth range do the spots cover?",
        a: "Roughly 80 to 400+ feet — the second and third reef ledges, the wrecks off Miami Beach, and the deep humps where pelagics push through.",
      },
      {
        q: "Are the daytime swordfish and deep spots included?",
        a: "Yes — the deep ledges and drop-offs that hold swordfish, blackfin tuna and mutton snapper are part of the set.",
      },
    ],
  },
  {
    slug: "panhandle",
    name: "Florida Panhandle GPS Fishing Maps",
    shortName: "Panhandle",
    region: "panhandle",
    city: "Destin",
    county: "Okaloosa",
    status: "coming-soon",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1772395371673-7aa1779e395f?auto=format&fit=crop&w=1200&q=80",
        alt: "Fishing boats on calm Destin water near a bridge",
        credit: "Jamie Harthcock / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1684035631153-da7d759c22a9?auto=format&fit=crop&w=900&q=80",
        alt: "Boat on bright blue Destin water",
        credit: "Brad / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1664157586349-49908e94dec5?auto=format&fit=crop&w=900&q=80",
        alt: "Pensacola Beach sunset over Gulf Coast water",
        credit: "Taylor Cole / Unsplash",
      },
    ],
    center: { lat: 30.3935, lng: -86.4958 },
    faqs: [
      {
        q: "How fast will I receive the Panhandle maps?",
        a: "Within an hour of payment — usually just a few minutes. The link is emailed automatically.",
      },
      {
        q: "Will these work with my unit?",
        a: "Yes. Choose Garmin, Lowrance, Humminbird, Simrad, Raymarine or Furuno at checkout; we also include a universal .gpx and a Google Earth .kmz.",
      },
      {
        q: "Do these include public reefs and private numbers?",
        a: "Both. You get the public artificial reefs everyone fishes plus proven private bottom that local captains have worked for years.",
      },
      {
        q: "Is this good for red snapper season?",
        a: "Yes — the offshore set is built around the reefs and hard bottom that hold red snapper, gag grouper, amberjack and triggerfish.",
      },
      {
        q: "How far does the coverage stretch?",
        a: "From Pensacola and Navarre through Destin and Panama City to Apalachicola Bay, including the inshore creeks and grass beds for reds and trout.",
      },
    ],
  },
  {
    slug: "jacksonville",
    name: "Jacksonville & St. Augustine GPS Fishing Maps",
    shortName: "Jacksonville",
    region: "east-coast",
    city: "Jacksonville",
    county: "Duval",
    status: "coming-soon",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1701246605727-67cd977f533e?auto=format&fit=crop&w=1200&q=80",
        alt: "St. Augustine waterfront with boats, bridge and coastline",
        credit: "Moses Malik Roldan / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1701246318021-84a7936a4ed8?auto=format&fit=crop&w=900&q=80",
        alt: "Boats floating near the St. Augustine lighthouse",
        credit: "Moses Malik Roldan / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1626963273726-d07244468eac?auto=format&fit=crop&w=900&q=80",
        alt: "St. Augustine Atlantic shoreline at sunrise",
        credit: "David Nicolai / Unsplash",
      },
    ],
    center: { lat: 30.3322, lng: -81.6557 },
    faqs: [
      {
        q: "How quickly are the maps delivered?",
        a: "Within an hour of checkout, usually minutes — emailed automatically once payment clears.",
      },
      {
        q: "Which chartplotters are supported?",
        a: "All major brands plus the Navionics app and Google Earth. Select your unit at checkout and we send the matching file.",
      },
      {
        q: "Does this cover the St. Johns River?",
        a: "Yes — the river and its tributaries make up most of the 92 inshore spots, holding flounder, redfish, sheepshead and trout.",
      },
      {
        q: "Are the offshore ledges and artificial reefs included?",
        a: "Yes — the Nine Mile, the Elton Bottom, the M Reef and many lesser-known ledges out to 18 fathoms are in the offshore set.",
      },
      {
        q: "Does it reach St. Augustine?",
        a: "Yes. Coverage runs from Mayport and the St. Johns south through Ponte Vedra and St. Augustine.",
      },
    ],
  },
  {
    slug: "everglades-10000-islands",
    name: "Everglades & 10,000 Islands GPS Fishing Maps",
    shortName: "Everglades & 10,000 Islands",
    region: "gulf-coast",
    city: "Naples",
    county: "Collier",
    status: "coming-soon",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1671678075677-eae303b606aa?auto=format&fit=crop&w=1200&q=80",
        alt: "Airboat crossing Everglades wetlands",
        credit: "Richard Sagredo / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1679429320306-e5ca96a714a8?auto=format&fit=crop&w=900&q=80",
        alt: "Everglades marsh water with lily pads",
        credit: "Nellie Adamyan / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1758464644123-a5c55ed41a66?auto=format&fit=crop&w=900&q=80",
        alt: "Boardwalk over lily pad wetlands in the Everglades",
        credit: "paws and prints / Unsplash",
      },
    ],
    center: { lat: 25.8523, lng: -81.3870 },
    faqs: [
      {
        q: "How fast is delivery?",
        a: "Within an hour of payment, usually minutes. The download link is emailed automatically.",
      },
      {
        q: "What format will I get?",
        a: "Your chartplotter brand's file (chosen at checkout), plus a universal .gpx and a .kmz for Google Earth.",
      },
      {
        q: "I don't know the backcountry — will this keep me off the bottom?",
        a: "These are fishing waypoints, not a navigation chart, so always run them alongside your unit's basemap and a good tide app. What they do is drop you on proven oyster bars, creeks, holes and points so you stop burning fuel searching blind.",
      },
      {
        q: "Do the spots come with tide notes?",
        a: "Yes. Because the 10,000 Islands fish so heavily on tide, each spot includes notes on the stage and season it produces best.",
      },
      {
        q: "What area is covered?",
        a: "From Marco Island and Goodland through Everglades City and Chokoloskee down to Flamingo — snook, redfish, tarpon, trout and snapper country.",
      },
    ],
  },
  {
    slug: "fort-lauderdale-palm-beach",
    name: "Fort Lauderdale & Palm Beach GPS Fishing Maps",
    shortName: "Fort Lauderdale & Palm Beach",
    region: "east-coast",
    city: "Fort Lauderdale",
    county: "Broward",
    status: "coming-soon",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1705351901492-34c189b1ae1b?auto=format&fit=crop&w=1200&q=80",
        alt: "Fort Lauderdale waterway with boats and palm-lined shoreline",
        credit: "Maloree Bloom / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1715350020111-7deb83f14281?auto=format&fit=crop&w=900&q=80",
        alt: "Coral reef fish underwater near Fort Lauderdale",
        credit: "Ricky Beron / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1654575100652-41d658a3bc86?auto=format&fit=crop&w=900&q=80",
        alt: "West Palm Beach waterway with sailboats and skyline",
        credit: "Richard Sagredo / Unsplash",
      },
    ],
    center: { lat: 26.1224, lng: -80.1373 },
    faqs: [
      {
        q: "How soon do I get the maps?",
        a: "Within an hour of checkout, usually minutes — emailed automatically once payment clears.",
      },
      {
        q: "Will the file work on my unit?",
        a: "Yes. Pick your brand at checkout (Garmin, Lowrance, Humminbird, Simrad, Raymarine, Furuno) and we send that format plus a universal .gpx and a Google Earth .kmz.",
      },
      {
        q: "Are the named wrecks included?",
        a: "Yes — the well-known Lauderdale wrecks like the Tracy, Mercedes, RBJ and Captain Dan are in the pack, along with the second and third reef ledges.",
      },
      {
        q: "Does it cover the sailfish kite-fishing zones?",
        a: "Yes. This is the heart of Florida's sailfish coast — the kite tracks from Boca Raton through Jupiter are mapped.",
      },
      {
        q: "What depths do the spots cover?",
        a: "From the inshore reef ledges out to the deeper troll and kite lanes — roughly 60 to 300 feet between Hillsboro Inlet and Jupiter.",
      },
    ],
  },
  {
    slug: "indian-river-lagoon",
    name: "Indian River Lagoon GPS Fishing Maps",
    shortName: "Indian River Lagoon",
    region: "east-coast",
    city: "Stuart",
    county: "Martin",
    status: "coming-soon",
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
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1751983115040-ab72bb397195?auto=format&fit=crop&w=1200&q=80",
        alt: "Fisherman on a pier at sunrise over the Indian River Lagoon",
        credit: "Phyllis Lilienthal / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1516633630673-67bbad747022?auto=format&fit=crop&w=900&q=80",
        alt: "Sebastian Inlet shoreline and blue water",
        credit: "Lacie Cueto / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1601517315022-0e57b19e88f3?auto=format&fit=crop&w=900&q=80",
        alt: "Aerial view of Jupiter Inlet and Atlantic water",
        credit: "Chase Baker / Unsplash",
      },
    ],
    center: { lat: 27.5311, lng: -80.4106 },
    faqs: [
      {
        q: "How fast will I get the maps?",
        a: "Within an hour of payment, usually minutes. The link is emailed automatically once Stripe confirms checkout.",
      },
      {
        q: "Which chartplotters and apps are supported?",
        a: "All major chartplotter brands plus the Navionics app and Google Earth. Choose your unit at checkout.",
      },
      {
        q: "Does it include Mosquito Lagoon for gator trout?",
        a: "Yes — the Mosquito Lagoon and Banana River grass flats that grow the state's biggest trout are part of the 158 inshore spots.",
      },
      {
        q: "Is this an inshore-only pack?",
        a: "Yes. Every spot is inshore — flats, potholes, docks and inlets from Sebastian down through Stuart and Jupiter, including the Crossroads where the St. Lucie meets the lagoon.",
      },
      {
        q: "Do the spots include tide and season notes?",
        a: "Yes. Each spot comes with notes on the tide stage and time of year it fishes best for trout, snook, redfish and black drum.",
      },
    ],
  },
  {
    slug: "south-florida-bundle",
    name: "South Florida Bundle — Keys + Miami GPS Maps",
    shortName: "South Florida Bundle",
    region: "south-florida",
    city: "South Florida",
    county: "Monroe & Miami-Dade",
    status: "live",
    isBundle: true,
    priceCents: 14999,
    spotCount: 499,
    inshoreCount: 118,
    offshoreCount: 266,
    reefCount: 76,
    wreckCount: 39,
    description:
      "Both of our live regions in one purchase: 499 GPS spots across the Florida Keys and Miami Offshore — save $39.99 vs. buying separately.",
    longDescription:
      "The two regions we currently have charted and ready to ship, together at a discount. You get the complete Florida Keys pack (312 spots from Key Largo to the Marquesas — reefs, wrecks, humps, ledges and backcountry flats) and the complete Miami Offshore pack (187 spots from Government Cut to the Gulf Stream edge). Every chartplotter format is included for both regions, along with the universal .gpx and Google Earth .kmz files and the PDF guides. As we finish charting more of Florida, new regions will launch separately — this bundle is exactly what exists today, nothing invented.",
    speciesTargets: [
      "Yellowtail Snapper",
      "Mutton Snapper",
      "Black Grouper",
      "Permit",
      "Tarpon",
      "Sailfish",
      "Mahi-Mahi",
      "Wahoo",
      "Blackfin Tuna",
      "Kingfish",
      "Swordfish",
      "Bonefish",
    ],
    launchPoints: [
      "Key Largo",
      "Islamorada",
      "Marathon",
      "Big Pine Key",
      "Key West",
      "Miami Beach",
      "Government Cut",
      "Haulover Inlet",
      "Crandon Park",
    ],
    featured: true,
    files: {},
    heroImage: HERO_DEFAULT,
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1576017454374-e24271593475?auto=format&fit=crop&w=1200&q=80",
        alt: "Florida Keys water and dock scenery at golden hour",
        credit: "Catherine / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1707803805432-ffb294d8027e?auto=format&fit=crop&w=900&q=80",
        alt: "Miami Beach offshore water with a boat in the distance",
        credit: "Arnav Das / Unsplash",
      },
      {
        src: "https://images.unsplash.com/photo-1697490600572-9e0b2c1eefea?auto=format&fit=crop&w=900&q=80",
        alt: "Sailboat on the ocean at sunset near Key West",
        credit: "Tim Nichols / Unsplash",
      },
    ],
    center: { lat: 25.1584, lng: -80.9859 },
    faqs: [
      {
        q: "How much do I save versus buying both regions separately?",
        a: "The Keys pack is $99.99 and Miami Offshore is $89.99 — $189.98 together. The bundle is $149.99, a saving of $39.99 (about 21%).",
      },
      {
        q: "Why only two regions? What happened to the statewide bundle?",
        a: "We only sell what we can deliver today. The Keys and Miami Offshore packs are finished, verified and ready to ship; the other regions are still being charted. When more regions are done, they'll launch individually and bigger bundles will return.",
      },
      {
        q: "How soon is it delivered?",
        a: "Within an hour of checkout, usually minutes. Everything is emailed automatically once payment clears.",
      },
      {
        q: "Do I get one big file or one file per region?",
        a: "One download containing both complete region packs — each with every chartplotter format, the universal .gpx, the Google Earth .kmz, and the PDF guides. Load them as separate folders or together.",
      },
      {
        q: "Does my chartplotter choice apply to the whole bundle?",
        a: "Your download includes every format for both regions — Garmin, Lowrance, Humminbird, Simrad, Raymarine, plus universal .gpx and Google Earth .kmz — so it works no matter which unit you run (or if you switch brands later).",
      },
    ],
  },
];

export function getProduct(slug: string): RegionProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Products that are purchasable today (deliverable files exist). */
export const LIVE_PRODUCTS = PRODUCTS.filter((p) => p.status === "live");

/** Single-region products (bundles excluded) — used for derived totals. */
export const REGION_PRODUCTS = PRODUCTS.filter((p) => !p.isBundle);

/** Live single-region products. */
export const LIVE_REGION_PRODUCTS = REGION_PRODUCTS.filter(
  (p) => p.status === "live"
);

/**
 * Total spots across LIVE regions only. Every marketing number on the site
 * derives from this — never hardcode spot totals in components.
 */
export const LIVE_SPOT_TOTAL = LIVE_REGION_PRODUCTS.reduce(
  (n, p) => n + p.spotCount,
  0
);

export function getFeatured(): RegionProduct[] {
  return PRODUCTS.filter((p) => p.featured && p.status === "live");
}
