import { initContextmenu } from "./package/core";

initContextmenu({
  // el: [...document.querySelectorAll(".menu")],
  // el: document.querySelector("#app"),
  list: [
    {
      text: "查看源码",
      on: {
        click: () => {
          window.open("https://github.com/kaijia323/kaijia-contextmenu#readme");
        },
      },
    },
    {
      text: "获取当前项的数据",
      key: "dd",
      id: "sss",
      on: {
        click: ({ context, config }) => {
          console.log(context);
          console.log(config);
        },
      },
    },
    {
      text: "获取当前项的数据2",
      key: "dd2",
      id: "sss2",
      on: {
        click: ({ context, config }) => {
          console.log(context.innerText);
          console.log(config);
        },
      },
    },
  ],
});
