const execa = require("execa");
import { version } from "../package.json";

const main = () => {
  execa.commandSync(`git add .`, { stdio: "inherit" });
  execa.commandSync(`git commit -am ${version}`, { stdio: "inherit" });
  execa.commandSync(`git push origin main`, { stdio: "inherit" });
  console.log(`推送github成功  ${version}`);
};

main();
