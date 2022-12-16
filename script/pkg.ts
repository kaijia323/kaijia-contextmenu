import { readFileSync, existsSync, writeFileSync } from "fs-extra";
import { resolve } from "path";

const pkgPath = resolve(__dirname, "../package.json");
const outPath = resolve(__dirname, "../dist/package.json");

const main = () => {
  if (!existsSync(pkgPath)) throw `${pkgPath}不存在`;
  const pkg = JSON.parse(readFileSync(pkgPath).toString());
  delete pkg.devDependencies;
  delete pkg.dependencies;
  delete pkg.scripts;
  pkg.main = "kaijia-contextmenu.mjs";
  pkg.exports = {
    ".": {
      import: "./kaijia-contextmenu.mjs",
      require: "./kaijia-contextmenu.js",
    },
  };
  pkg.types = "core.d.ts";
  // console.log(pkg);
  writeFileSync(outPath, JSON.stringify(pkg, null, 2));
  console.log("copy pkg done");
};

main();
