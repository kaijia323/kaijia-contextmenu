# kaijia-contextmenu, 自定义浏览器右键菜单

## 安装

`npm i kaijia-contextmenu`

## 使用

默认

```javascript
import { initContextmenu } from "kaijia-contextmenu";

// 什么都不传，则监听window的contextmenu事件
initContextmenu();
```

改变菜单样式

```javascript
import { initContextmenu } from "kaijia-contextmenu";

initContextmenu({
  list: [
    "关闭标签",
    "关闭其他标签",
    "关闭右侧标签",
    {
      text: "关闭左侧标签",
      style: {
        // 单独对该菜单修改hover的颜色
        hoverColor: "#f0f",
        // ...
      },
    },
  ],
  style: {
    // 改变菜单面板的颜色
    background: "#CE5777",
    // ...
  },
  itemConfig: {
    style: {
      hoverColor: "#f00",
    },
  },
});
```

响应菜单的点击事件

```javascript
import { initContextmenu } from "kaijia-contextmenu";

initContextmenu({
  list: [
    {
      text: "关闭标签",
      id: "close",
      className: "close",
      on: {
        click: ({ config, context }) => {
          // config.id === 'close'
          // context.innerText === '关闭标签'
          // context.className === 'close'
          // 逻辑...
        },
      },
    },
    {
      text: "关闭右侧标签",
      key: "closeRight",
      on: {
        click: ({ config }) => {
          // config.key === 'closeRight'
          // 逻辑...
        },
      },
    },
  ],
});
```

## 参数 IConfig

```typescript
interface IConfig {
  el?: HTMLElement | HTMLElement[];
  className?: string;
  list?: string[] | IItemConfig[];
  style?: Record<string, string>;
  itemConfig?: Omit<IItemConfig, "text">;
}
```

### el?: HTMLElement | HTMLElement[]

指定`contextmenu`的事件绑定在哪个节点，如果为空则绑定在`window`

**注: 如果传数组，则不能是伪数组，你可以这样传入**

`initContextmenu({el: [...document.querySelectAll('.menu')]})`

### className?: string

整个菜单面板的类名

### list?: string[] | IItemConfig[]

每个菜单的配置，[IItemConfig](#IItemConfig)

### style?: Record<string, string>

整个菜单面板的样式

### itemConfig?: Omit<IItemConfig, "text">

统一配置每个菜单项的属性，不会覆盖`list`字段已有的配置

```javascript
// 1
initContextmenu({
  list: ['哈哈', '呵呵'],
  // 统一配置 哈哈、呵呵的颜色
  itemConfig: {
    style: {
      color: #fff
    }
  }
})

// 2
initContextmenu({
  list: [
    {
      text: '哈哈',
      style: {
        // color属性不会被覆盖
        color: #f00
      }
    },
    {
      text: '呵呵',
    },
    '嘻嘻'
  ],
  // 统一配置 哈哈、呵呵、嘻嘻的颜色和文字大小
  itemConfig: {
    style: {
      color: #fff,
      fontSize: '24px'
    }
  }
})
```

## IItemConfig

```typescript
interface IItemConfig {
  text: string;
  className?: string;
  on?: Omit<On, "click"> & {
    click: (params: IClickParams) => void;
  };
  style?: Record<string, string> & {
    hoverColor: string;
  };
}
```

### text: string

菜单的文字

### className?: string

菜单的类名

### on?: Omit<On, "click"> & { click: (params: IClickParams) => void }

`dom`事件

**注：考虑到`click`事件用的较多，所以单独对 `click` 事件做了处理，参数是 [IClickParams](#IClickParams)**

### style?: Record<string, string> & { hoverColor: string }

菜单的样式

### IClickParams

```typescript
interface IClickParams {
  event: MouseEvent;
  // 当前响应contextmenu事件的元素，即右键点击的元素
  context: HTMLElement;
  // 当前菜单的配置
  config: IItemConfig;
}
```
