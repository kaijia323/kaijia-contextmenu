import {
  init,
  h,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
} from "snabbdom";

interface IConfig {
  el?: HTMLElement;
}

const initDom = (parentNode: HTMLElement) => {
  const elEmpty = document.createElement("div");
  parentNode.appendChild(elEmpty);

  const patch = init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
  ]);

  const vNode = h(
    "div",
    {
      class: {
        kaijiaContextmenu: true,
      },
    },
    "kaijia contextmenu"
  );

  patch(elEmpty, vNode);
};

const initContextmenu = (config?: IConfig) => {
  const el = config?.el || document.body;
  initDom(el);
};

export { initContextmenu };
