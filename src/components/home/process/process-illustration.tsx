import {useId} from "react";

type Props = {active: number; labels: string[]};
// Both faces share the same rounded edge, so the side meets them exactly.
const frontEdge = "C-78 4-76 6-72 8L-8 45Q0 50 8 45L72 8C76 6 78 4 78 0";
const tileTop = `M-78 0${frontEdge}C78-4 76-6 72-8L8-45Q0-50-8-45L-72-8C-76-6-78-4-78 0Z`;
const positions = [[214, 185], [400, 235], [586, 285], [177, 375], [363, 425]];

/** Original isometric SVG artwork; no Tailark Pro assets are embedded. */
export function ProcessIllustration({active, labels}: Props) {
  const id = useId().replaceAll(":", "");
  const pattern = `process-dots-${id}`;
  const surface = "var(--background)";
  const accent = "var(--color-brand)";
  return <svg viewBox="30 76 700 488" fill="none" aria-hidden="true" className="h-auto w-full overflow-visible">
    <defs>
      <pattern id={pattern} width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.6" fill="currentColor" opacity="0.2" /></pattern>
    </defs>
    {positions.map(([x, y], index) => {
      const selected = active === index;
      const detailAccent = selected ? accent : "currentColor";
      const depth = 22;
      const tileSide = `M-78 0${frontEdge}v${depth}
        c0 4-2 6-6 8l-64 37q-8 5-16 0l-64-37c-4-2-6-4-6-8Z`;
      return <g key={index} transform={`translate(${x} ${y - 14})`}
        className="motion-safe:transition-opacity motion-safe:duration-500"
        opacity={selected ? 1 : 0.85} style={{color: selected ? "var(--foreground)" : "var(--muted-foreground)"}}>
        <g transform="rotate(-15)">
          {selected && <ellipse cy={depth + 26} rx="88" ry="43" fill={detailAccent} opacity="0.07" />}
          <path d={tileSide} fill={surface} stroke="currentColor" strokeOpacity="0.48" />
          <path d={tileSide} fill={`url(#${pattern})`} />
          <path d={tileTop} fill={surface} stroke="currentColor" strokeOpacity="0.72" strokeWidth="1.3" />
          <g transform="matrix(.86 .5 -.86 .5 0 0)" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            {index === 0 && <>
              <rect x="-31" y="-29" width="62" height="58" rx="6" fill={surface} />
              <rect x="-20" y="-18" width="12" height="12" rx="2" stroke={detailAccent} fill={detailAccent} fillOpacity="0.12" />
              <path d="M0-15h20M0-8h13M-20 5h40M-20 13h34M-20 21h24" strokeOpacity="0.55" />
            </>}
            {index === 1 && <g transform="translate(1 -1) scale(.8)">
              <path d="M-31-13H0v28h31M0-13h31M0 1h-31" strokeOpacity="0.5" />
              {[[-47,-22],[-16,-22],[17,-22],[-47,-8],[17,7]].map(([nx,ny], i) => <rect key={i} x={nx} y={ny} width="27" height="17" rx="3" fill={surface} stroke={i === 1 ? detailAccent : "currentColor"} />)}
              <circle cx="-2" cy="-13" r="2" fill={detailAccent} stroke="none" />
            </g>}
            {index === 2 && <g transform="scale(.82)">
              <rect x="-45" y="-29" width="90" height="58" rx="6" fill={surface} />
              <path d="M-44-17h88M-19-17v45" strokeOpacity="0.4" />
              <circle cx="-36" cy="-23" r="1.7" fill={detailAccent} stroke="none" />
              <path d="M-12-7h26M-12 0H6M-12 19H10" strokeOpacity="0.55" />
              <rect x="20" y="-7" width="16" height="22" rx="2" fill={detailAccent} fillOpacity="0.15" stroke={detailAccent} />
              <rect x="-12" y="7" width="23" height="7" rx="2" fill={detailAccent} stroke="none" />
            </g>}
            {index === 3 && <>
              <rect x="-36" y="-26" width="72" height="52" rx="6" fill={surface} />
              <path d="M-25-13h19M-25-6h13M-25 7h18M-25 14h12" strokeOpacity="0.45" />
              <circle cx="17" cy="2" r="12" fill={detailAccent} fillOpacity="0.12" stroke={detailAccent} />
              <path d="m11 2 4 4 8-8" stroke={detailAccent} strokeWidth="2" />
            </>}
            {index === 4 && <g transform="translate(0 -2) scale(.88)">
              <path d="M-34-17v36h68v-36" strokeOpacity="0.5" />
              <path d="m-34-17 34 20 34-20L0-35Z" fill={surface} stroke={detailAccent} />
              <path d="M0 3v36M-34 19l34 20 34-20" strokeOpacity="0.5" />
              <path d="M0-9v-17m-5 5 5-5 5 5" stroke={detailAccent} strokeWidth="2" />
            </g>}
          </g>
        </g>
        <text x="0" y={depth + 83} textAnchor="middle" fill="currentColor" stroke="none" className="font-mono text-[12px]">{String(index + 1).padStart(2, "0")}</text>
        <text x="0" y={depth + 103} textAnchor="middle" fill="currentColor" stroke="none" className="font-sans text-[14px]">{labels[index]}</text>
      </g>;
    })}
  </svg>;
}
