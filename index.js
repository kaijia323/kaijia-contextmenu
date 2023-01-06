import { initContextmenu } from "./package/core";

initContextmenu({
  el: document.querySelector("#app"),
  list: Array(10).fill({
    text: "查看源码",
    on: {
      click: () => {
        window.open("https://github.com/kaijia323/kaijia-contextmenu#readme");
      },
    },
  }),
});
