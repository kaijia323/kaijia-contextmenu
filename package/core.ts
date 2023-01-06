import {
  init,
  h,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
} from "snabbdom";
import type { On } from "snabbdom";

interface IItemConfig {
  text: string;
  className?: string;
  on?: Omit<On, "click"> & {
    click: (e: MouseEvent, contextmenuEle: HTMLElement) => void;
  };
  style?: Record<string, string> & {
    hoverColor: string;
  };
}

interface IConfig {
  el?: HTMLElement;
  className?: string;
  list?: string[] | IItemConfig[];
  style?: Record<string, string>;
  itemConfig?: Omit<IItemConfig, "text">;
}

interface Pos {
  x: number;
  y: number;
}

const defaultConfig: IConfig = {
  className: "kaijiaContextmenu",
  list: [
    {
      text: "查看源码",
      on: {
        click: () => {
          window.open("https://github.com/kaijia323/kaijia-contextmenu#readme");
        },
      },
    },
  ],
  style: {
    minWidth: "160px",
    padding: "4px",
    backgroundColor: "#51C4D3",
    color: "#fff",
    fontSize: "12px",
    userSelect: "none",
    borderRadius: "6px",
  },
};

let globalConfig: IConfig = {};

// 当前的 contextmenu
let currentContextmenu: HTMLElement | null = null;

const initDom = (pos: Pos) => {
  const className = globalConfig.className;
  let contextmenuEle = document.querySelector(`.${className}`);
  if (!contextmenuEle) {
    contextmenuEle = document.createElement("div");
    document.body.appendChild(contextmenuEle);
  }

  const patch = init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
  ]);

  // 新的菜单Node
  const vNode = h(
    "div",
    {
      class: {
        [className!]: true,
      },
      style: {
        position: "fixed",
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        ...globalConfig.style,
      },
    },
    // 每个菜单
    globalConfig.list!.map(item => {
      const itemConfig = item as IItemConfig;
      return h(
        "div",
        {
          on: {
            ...itemConfig.on,
            click: e => {
              if (itemConfig.on?.click) {
                itemConfig.on.click(e, currentContextmenu!);
              }
            },
            mouseenter: e =>
              ((e.target! as HTMLElement).style.backgroundColor =
                itemConfig.style?.hoverColor ?? "rgba(0, 0, 0, 0.2)"),
            mouseleave: e =>
              ((e.target! as HTMLElement).style.backgroundColor =
                itemConfig.style?.backgroundColor ??
                itemConfig.style?.background ??
                "unset"),
          },
          class: {
            [itemConfig.className ?? "menu-item"]: !!itemConfig.className,
          },
          style: {
            padding: "8px",
            cursor: "pointer",
            borderRadius: "4px",
            ...itemConfig.style,
          },
        },
        itemConfig.text
      );
    })
  );

  const v = patch(contextmenuEle!, vNode);
  // 边界处理
  const offsetW = (v.elm as HTMLElement).offsetWidth;
  const offsetH = (v.elm as HTMLElement).offsetHeight;
  const maxW = document.documentElement.clientWidth;
  const maxH = document.documentElement.clientHeight;

  if (pos.x + offsetW > maxW && pos.y + offsetH > maxH) {
    initDom({
      x: maxW - offsetW,
      y: maxH - offsetH,
    });
  } else if (pos.y + offsetH > maxH) {
    initDom({
      x: pos.x,
      y: maxH - offsetH,
    });
  } else if (pos.x + offsetW > maxW) {
    initDom({
      x: maxW - offsetW,
      y: pos.y,
    });
  }
  // 边界处理
};

const event = () => {
  const bindEle = globalConfig.el ? globalConfig.el : window;
  window.addEventListener("click", _ => {
    document.querySelector(`.${globalConfig.className}`)?.remove();
  });
  bindEle.addEventListener("contextmenu", e => {
    e.preventDefault();
    currentContextmenu = e.target as HTMLElement;
    const { clientX, clientY } = e as MouseEvent;
    initDom({ x: clientX, y: clientY });
  });
};

const initContextmenu = (config?: IConfig) => {
  config && (globalConfig = config);

  Object.keys(defaultConfig).forEach(key => {
    // @ts-ignore
    globalConfig[key] = globalConfig[key] ?? defaultConfig[key];
  });
  globalConfig.list!.forEach((item, index) => {
    if (typeof item === "string") {
      globalConfig.list![index] = Object.assign({}, globalConfig.itemConfig, {
        text: item,
      });
    } else {
      globalConfig.list![index] = Object.assign(
        {},
        globalConfig.itemConfig,
        item
      );
    }
  });
  event();
};

export { initContextmenu };
