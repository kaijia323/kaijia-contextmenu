import { initContextmenu } from "./package/core";

initContextmenu({
  // el: [...document.querySelectorAll(".menu")],
  // el: document.querySelector("#app"),
  list: Array(10).fill({
    text: "查看源码",
    on: {
      click: (_, el) => {
        console.log(el);
        window.open("https://github.com/kaijia323/kaijia-contextmenu#readme");
      },
    },
  }),
});
