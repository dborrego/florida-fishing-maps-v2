import type { RegionProduct } from "@/lib/products";

/**
 * ChartplotterPreview
 *
 * A fully self-contained SVG mockup of a marine chartplotter screen, generated
 * from the product's own data (center coordinates, target species, spot mix).
 * No external assets — renders identically at any size and carries no licensing
 * risk. Shows customers what a loaded waypoint looks like on their unit.
 */

function toDegMin(value: number) {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const min = ((abs - deg) * 60).toFixed(3);
  return { deg, min };
}

export function ChartplotterPreview({ product }: { product: RegionProduct }) {
  const lat = toDegMin(product.center.lat);
  const lng = toDegMin(product.center.lng);
  const latStr = `${lat.deg}°${lat.min}'N`;
  const lngStr = `${lng.deg}°${lng.min}'W`;

  // Representative sample depth based on the pack's dominant water type.
  const offshoreHeavy = product.offshoreCount >= product.inshoreCount;
  const sampleDepth = offshoreHeavy ? 88 : 9;
  const sampleTemp = 79;
  const topSpecies = product.speciesTargets.slice(0, 3).join(" · ");

  return (
    <figure className="not-prose">
      <div className="rounded-2xl bg-[#0b0f17] p-3 ring-1 ring-plotter/15 shadow-2xl">
        <svg
          viewBox="0 0 640 400"
          className="w-full h-auto rounded-xl"
          role="img"
          aria-label={`Chartplotter screen showing a sample ${product.shortName} fishing waypoint at ${latStr} ${lngStr}`}
        >
          {/* chart water base */}
          <rect x="0" y="0" width="640" height="330" fill="#bfe0f2" />
          {/* depth bands */}
          <polygon points="0,150 640,110 640,330 0,330" fill="#93cbe8" />
          <polygon points="0,230 640,195 640,330 0,330" fill="#67b2dd" />
          <polygon points="330,285 640,265 640,330 340,330" fill="#3d93cf" />
          {/* depth contour lines */}
          <path d="M0,182 C150,170 350,158 640,134" fill="none" stroke="#5a93b4" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
          <path d="M0,252 C200,238 420,222 640,214" fill="none" stroke="#3f7ba0" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
          {/* land corner */}
          <polygon points="0,300 110,284 138,312 86,330 0,330" fill="#e7dcbf" stroke="#c4b184" strokeWidth="1" />
          <text x="40" y="320" fontFamily="monospace" fontSize="11" fill="#7d6f49">
            {product.city.toUpperCase()}
          </text>
          {/* depth soundings */}
          <text x="190" y="196" fontFamily="monospace" fontSize="10" fill="#2c5871">54</text>
          <text x="280" y="232" fontFamily="monospace" fontSize="10" fill="#2c5871">61</text>
          <text x="450" y="214" fontFamily="monospace" fontSize="10" fill="#1f4a63">72</text>
          <text x="520" y="280" fontFamily="monospace" fontSize="10" fill="#173c52">96</text>

          {/* waypoint crosshair */}
          <line x1="362" y1="180" x2="362" y2="244" stroke="#0a1622" strokeWidth="1.5" />
          <line x1="330" y1="212" x2="394" y2="212" stroke="#0a1622" strokeWidth="1.5" />
          <circle cx="362" cy="212" r="15" fill="none" stroke="#0a1622" strokeWidth="1.5" />
          <circle cx="362" cy="212" r="4" fill="#00FFB2" stroke="#0a1622" strokeWidth="1" />
          <rect x="372" y="176" width="118" height="20" rx="3" fill="#0b1c2a" />
          <text x="380" y="190" fontFamily="monospace" fontSize="11" fill="#00FFB2">
            SAMPLE WAYPOINT
          </text>

          {/* north arrow */}
          <polygon points="606,30 612,46 600,46" fill="#0a1622" />
          <text x="598" y="62" fontFamily="monospace" fontSize="10" fill="#0a1622">N</text>
          {/* scale bar */}
          <line x1="520" y1="308" x2="600" y2="308" stroke="#0a1622" strokeWidth="2" />
          <line x1="520" y1="303" x2="520" y2="313" stroke="#0a1622" strokeWidth="2" />
          <line x1="600" y1="303" x2="600" y2="313" stroke="#0a1622" strokeWidth="2" />
          <text x="528" y="302" fontFamily="monospace" fontSize="10" fill="#0a1622">0.5 nm</text>

          {/* top status strip */}
          <rect x="0" y="0" width="640" height="26" fill="#040A14" opacity="0.92" />
          <circle cx="18" cy="13" r="5" fill="none" stroke="#00FFB2" strokeWidth="1.5" />
          <circle cx="18" cy="13" r="1.8" fill="#00FFB2" />
          <text x="32" y="17" fontFamily="monospace" fontSize="11" fill="#F8FAFC">FloridaFishingMaps</text>
          <text x="536" y="17" fontFamily="monospace" fontSize="11" fill="#00E5FF">GPS 3D · 11 SAT</text>

          {/* bottom data bar */}
          <rect x="0" y="330" width="640" height="70" fill="#0a0e17" />
          <line x1="176" y1="342" x2="176" y2="388" stroke="#1c2733" strokeWidth="1" />
          <line x1="330" y1="342" x2="330" y2="388" stroke="#1c2733" strokeWidth="1" />
          <line x1="476" y1="342" x2="476" y2="388" stroke="#1c2733" strokeWidth="1" />

          <text x="18" y="354" fontFamily="monospace" fontSize="9" fill="#64748b">POSITION</text>
          <text x="18" y="372" fontFamily="monospace" fontSize="13" fill="#F8FAFC">{latStr}</text>
          <text x="18" y="388" fontFamily="monospace" fontSize="13" fill="#F8FAFC">{lngStr}</text>

          <text x="192" y="354" fontFamily="monospace" fontSize="9" fill="#64748b">DEPTH (SAMPLE)</text>
          <text x="192" y="380" fontFamily="monospace" fontSize="22" fill="#00FFB2">{sampleDepth} ft</text>

          <text x="346" y="354" fontFamily="monospace" fontSize="9" fill="#64748b">WATER TEMP</text>
          <text x="346" y="380" fontFamily="monospace" fontSize="22" fill="#00E5FF">{sampleTemp}°F</text>

          <text x="492" y="354" fontFamily="monospace" fontSize="9" fill="#64748b">TARGETS</text>
          <text x="492" y="372" fontFamily="monospace" fontSize="11" fill="#F8FAFC">{product.speciesTargets[0] ?? ""}</text>
          <text x="492" y="386" fontFamily="monospace" fontSize="11" fill="#F8FAFC">{product.speciesTargets.slice(1, 3).join(" · ")}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-foam/50 font-mono">
        Illustration of a loaded waypoint near {product.shortName} ({latStr} {lngStr}).
        Targets shown: {topSpecies}. Your pack includes {product.spotCount} verified
        coordinates.
      </figcaption>
    </figure>
  );
}
