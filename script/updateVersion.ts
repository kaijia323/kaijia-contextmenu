import {
  readFileSync,
  existsSync,
  writeFileSync,
  writeJSONSync,
} from "fs-extra";
import { resolve } from "path";

const pkgPath = resolve(__dirname, "../package.json");
const main = () => {
  const pkg = JSON.parse(readFileSync(pkgPath).toString());
  const version = pkg.version as string;
  let [a, b, c] = version.split(".");
  pkg.version = [a, b, +c + 1].join(".");
  writeJSONSync(pkgPath, pkg, {
    spaces: 2,
  });
  console.log(`版本升级成功，当前版本: ${pkg.version}`);
};

main();
