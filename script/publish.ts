const execa = require("execa");
import { resolve } from "path";

const cwd = resolve(__dirname, "../dist");

const main = () => {
  try {
    execa.commandSync("npm publish", { cwd, stdio: "inherit" });
    execa.commandSync(`git push origin main`, { stdio: "inherit" });
    console.log("发布成功!!!");
  } catch (error) {
    console.log("发布失败");
    process.exit(-1);
  }
};

main();
