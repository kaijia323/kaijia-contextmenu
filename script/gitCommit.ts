const execa = require("execa");
import { version } from "../package.json";

const main = () => {
  execa.commandSync(`git add .`, { stdio: "inherit" });
  execa.commandSync(`git commit -am ${version}`, { stdio: "inherit" });

  console.log(`git commit success  ${version}`);
};

main();
