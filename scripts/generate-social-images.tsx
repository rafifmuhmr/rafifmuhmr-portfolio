// Run with: bun scripts/generate-social-images.tsx
// Font is fetched only when regenerating assets, never when serving the site.
import {ImageResponse} from "next/og";
import sharp from "sharp";
import {readFile, writeFile, mkdir} from "node:fs/promises";
import {site} from "../src/config/site";

const fontUrl = "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0nNSg.ttf";
const response = await fetch(fontUrl);
if (!response.ok) throw new Error("Unable to download the OG typeface");
const font = await response.arrayBuffer();
const logo = `data:image/svg+xml;base64,${(await readFile("public/rafifmuhmr-logo.svg")).toString("base64")}`;

await mkdir("public/og", {recursive: true});
for (const locale of ["en", "id"]) {
  const image = new ImageResponse(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#111111", color: "#fafafa", fontFamily: "Jakarta", fontWeight: 600}}>
      <div style={{display: "flex", alignItems: "center", gap: 18}}>
        {/* next/image is not supported inside ImageResponse. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={52} height={52} alt="" />
        <span style={{fontSize: 32}}>rafifmuhmr</span>
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: 22}}>
        <div style={{display: "flex", flexDirection: "column", fontSize: 66, lineHeight: 1.15, maxWidth: 1000}}><span>Rafif Muhammad</span><span>Muflihur Rodwa</span></div>
        <div style={{fontSize: 28, color: "#a3a3a3"}}>{locale === "id" ? "Frontend Developer & Desainer UI/UX" : site.role}</div>
      </div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #303030", paddingTop: 24, color: "#a3a3a3", fontSize: 20}}>
        <span>Banyuwangi, Indonesia</span>
        <span style={{color: "#CE6B4E"}}>Design with purpose. Build with care.</span>
      </div>
    </div>,
    {width: 1200, height: 630, fonts: [{name: "Jakarta", data: font, weight: 600, style: "normal"}]},
  );
  await writeFile(`public/og/${locale}.png`, Buffer.from(await image.arrayBuffer()));
}
const svg = await readFile("public/rafifmuhmr-logo.svg");
await sharp(Buffer.from(svg)).resize(48, 48).png().toFile("public/icon.png");
await sharp(Buffer.from(svg)).resize(132, 132).extend({top: 24, bottom: 24, left: 24, right: 24, background: "#111111"}).png().toFile("public/apple-icon.png");
console.log("Generated EN/ID Open Graph images and application icons.");
