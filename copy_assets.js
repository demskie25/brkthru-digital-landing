const fs = require("fs");
const path = require("path");

const srcDir =
  "C:/Users/Administrator/.gemini/antigravity/brain/93a53bb6-00dc-4990-88ed-86c25e161369";
const destDirs = [
  "c:/Users/Administrator/OneDrive/Documents/brkthru-digital-landing",
  "c:/Users/Administrator/OneDrive/Documents/brkthru-digital-landing/event-app/public",
];

const files = [
  ["timeline_genesis_1997_1768228652782.png", "timeline_genesis_1997.png"],
  ["timeline_dna_build_1999_1768228670281.png", "timeline_dna_build_1999.png"],
  ["timeline_precision_2013_1768228690724.png", "timeline_precision_2013.png"],
  [
    "timeline_integration_2014_2018_1768228707436.png",
    "timeline_integration_2014_2018.png",
  ],
  [
    "timeline_resilience_2020_pivot_1768228724189.png",
    "timeline_resilience_2020_pivot.png",
  ],
  [
    "timeline_mountain_summit_2026_1768228745630.png",
    "timeline_mountain_summit_2026.png",
  ],
];

destDirs.forEach((destDir) => {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  files.forEach(([src, dest]) => {
    const srcPath = path.join(srcDir, src);
    const destPath = path.join(destDir, dest);
    try {
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Successfully copied ${src} to ${destPath}`);
      } else {
        console.error(`Source file not found: ${srcPath}`);
      }
    } catch (err) {
      console.error(`Error copying to ${destPath}: ${err.message}`);
    }
  });
});
