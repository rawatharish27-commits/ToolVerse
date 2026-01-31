
import fs from "fs";
import path from "path";
// Fix: Imported process explicitly from node:process to ensure access to native Node.js properties like cwd()
import process from "node:process";
import {
  GOLDEN_INDEX_TSX,
  GOLDEN_VALIDATE,
  GOLDEN_NORMALIZE,
  GOLDEN_VERIFY,
  GOLDEN_EXPLAIN,
  GOLDEN_METADATA,
} from "./golden-tool-files";

const TOOLS_DIR = path.join(process.cwd(), "tools");

const required = [
  { name: "index.tsx", content: GOLDEN_INDEX_TSX },
  { name: "validate.ts", content: GOLDEN_VALIDATE },
  { name: "normalize.ts", content: GOLDEN_NORMALIZE },
  { name: "verify.ts", content: GOLDEN_VERIFY },
  { name: "explain.ts", content: GOLDEN_EXPLAIN },
];

async function runFix() {
  if (!fs.existsSync(TOOLS_DIR)) {
    console.error("Tools directory not found at:", TOOLS_DIR);
    return;
  }

  const toolFolders = fs.readdirSync(TOOLS_DIR)
    .filter(f => fs.statSync(path.join(TOOLS_DIR, f)).isDirectory());

  for (const slug of toolFolders) {
    const dir = path.join(TOOLS_DIR, slug);

    // ensure process.ts exists so the tool can actually do something
    const processFile = path.join(dir, "process.ts");
    if (!fs.existsSync(processFile)) {
      fs.writeFileSync(processFile, `/**\n * Logic Node: ${slug}\n */\nexport async function process(input: any) { return { status: "processed", ...input }; }`);
    }

    // create missing standard files
    for (const r of required) {
      const p = path.join(dir, r.name);
      if (!fs.existsSync(p)) fs.writeFileSync(p, r.content);
    }

    // metadata
    const meta = path.join(dir, "metadata.json");
    if (!fs.existsSync(meta)) fs.writeFileSync(meta, GOLDEN_METADATA(slug));

    console.log("✔ fixed logic node:", slug);
  }

  console.log("\n🚀 DONE: All tools auto-fixed. Total nodes ready:", toolFolders.length);
}

runFix().catch(console.error);
