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

interface Pos {
  x: number;
  y: number;
}

const initDom = (parentNode: HTMLElement, pos: Pos) => {
  const elEmpty = document.createElement("div");
  parentNode.appendChild(elEmpty);

  const patch = init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
  ]);
  console.log(pos);

  const vNode = h(
    "div",
    {
      class: {
        kaijiaContextmenu: true,
      },
      style: {
        cursor: "pointer",
        userSelect: "none",
        position: "fixed",
        top: `${pos.y}px`,
        left: `${pos.x}px`,
      },
    },
    "kaijia contextmenu"
  );

  patch(elEmpty, vNode);
};

const event = (el: HTMLElement) => {
  window.addEventListener("contextmenu", e => {
    e.preventDefault();
    const { clientX, clientY } = e;
    initDom(el, { x: clientX, y: clientY });
  });
};

const initContextmenu = (config?: IConfig) => {
  const el = config?.el || document.body;
  event(el);
};

export { initContextmenu };
