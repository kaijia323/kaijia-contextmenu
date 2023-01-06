const execa = require("execa");
import { resolve } from "path";
import { version } from "../package.json";

const cwd = resolve(__dirname, "../dist");

const main = () => {
  try {
    execa.commandSync(`git add .`, { stdio: "inherit" });
    execa.commandSync(`git commit -am ${version}`, { stdio: "inherit" });

    execa.commandSync("npm publish", { cwd, stdio: "inherit" });
    execa.commandSync(`git push origin main`, { stdio: "inherit" });
    console.log("发布成功!!!");
  } catch (error) {
    console.log("发布失败");
    process.exit(-1);
  }
};

main();
