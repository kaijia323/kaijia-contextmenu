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
  on?: On;
  style?: Record<string, string> & {
    hoverColor: string;
  };
}

interface IConfig {
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
    minWidth: "120px",
    // minHeight: "60px",
    // width: "fit-content",
  },
};

let globalConfig: IConfig = {};

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
        padding: "12px 8px",
        backgroundColor: "#51C4D3",
        borderRadius: "6px",
        color: "#fff",
        fontSize: "12px",
        userSelect: "none",
        ...globalConfig.style,
      },
    },
    globalConfig.list!.map(item => {
      const itemConfig = item as IItemConfig;
      return h(
        "div",
        {
          on: {
            ...itemConfig.on,
            mousedown: e => {
              if (e.button == 2) {
                e.stopPropagation();
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
            borderRadius: "6px",
            ...itemConfig.style,
          },
        },
        itemConfig.text
      );
    })
  );

  const v = patch(contextmenuEle!, vNode);
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
};

const event = () => {
  window.addEventListener("click", e => {
    document.querySelector(`.${globalConfig.className}`)?.remove();
  });
  window.addEventListener("contextmenu", e => {
    e.preventDefault();
  });
  window.addEventListener("mousedown", e => {
    if (e.button == 2) {
      const { clientX, clientY } = e;
      initDom({ x: clientX, y: clientY });
    }
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
