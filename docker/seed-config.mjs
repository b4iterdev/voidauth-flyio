import fs from "node:fs";
import path from "node:path";

const sourceRoot = "/app/customization-seed";
const targetRoot = "/app/config";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyTree(sourceDir, targetDir) {
  ensureDir(targetDir);

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(sourceDir, entry.name);
    const dst = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyTree(src, dst);
      continue;
    }

    if (entry.isFile()) {
      fs.copyFileSync(src, dst);
    }
  }
}

if (!fs.existsSync(sourceRoot)) {
  throw new Error(`Seed source does not exist: ${sourceRoot}`);
}

ensureDir(targetRoot);
copyTree(sourceRoot, targetRoot);

console.log(`Seeded config from ${sourceRoot} to ${targetRoot}`);
