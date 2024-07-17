# React-Puppeteer

这是一个可以在node环境中,使用puppeteer对React组件进行截图的库

强大的现代化框架React.js将为你管理组件和代码

[点击 学习 React.js](https://react.docschina.org/)

> VScode 安装插件 `ES7+ React/Redux/React-Native snippets`

## 使用教程

- install

```sh
npm install yarn@1.12.1 -g
yarn add react puppeteer react-puppeteer -W
```

- react-puppeteer-env.d.ts

> 扩展类型声明

```ts
/// <reference types="react-puppeteer/env" />
```

- .puppeteerrc.cjs

> 自动搜索浏览器内核

```cjs
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = require('react-puppeteer/.puppeteerrc')
```

- use

```tsx
import React from 'react'
export default () => {
  return <div> hello React ! </div>
}
```

```ts
import React from 'react'
import { Picture } from 'react-puppeteer'
import HelpComponent from './MyHelp.tsx'
export class ScreenshotPicture extends Picture {
  constructor() {
      // 继承实例
      super()
      // 启动
      this.Pup.start()
  }
  /**
   *
   * @param uid
   * @param Props
   * @returns
   */
  getHelp(uid: number, Props: Parameters<typeof HelpComponent.default>[0]) {
      // 生成 html 地址 或 html字符串
      return this.screenshot({
          // html/hello/uid.html
          join_dir: 'hello',
          html_name: `${uid}.html`,
          html_body: <HelpComponent {...Props} />
      })
  }

}
// 初始化 图片生成对象
export const Screenshot = new ScreenshotPicture()
```

```ts title="./apps.ts"
import { Screenshot } from ''
const img: Buffer | false = await Screenshot.getHelp(123456, {})
```

## 开发启动

```sh
node --no-warnings=ExperimentalWarning --loader ts-node/esm server.ts
```

- server.ts

```ts
import { createServer } from 'react-puppeteer'
await createServer()
```

- routes.config.tsx

```tsx
import React from 'react'
import { defineConfig } from 'react-puppeteer'
const Music = () => {
  return <div> 我的音乐</div>
}
export default defineConfig([
  {
    url: '/music',
    options: {
      html_body: <Music />
    }
  }
])
```

## 扩展功能

> VScode 安装插件 `Path Intellisense`

### 动态组件

```ts
import * as hellos from './hello.tsx'
import { createDynamicComponent } from 'react-puppeteer'
const dynamic = createDynamicComponent(import.meta.url)
/**
 *
 * 该方法可被重复执行
 * 并触发dynamic重新加载
 * @param Props
 * @returns
 */
async function DynamicHello(Props: Parameters<typeof hellos.default>[0]) {
  const Hello = (await dynamic<typeof hellos>('./hello.tsx')).default
  return <Hello {...Props} />
}
```

使用`createDynamicComponent`将创建一个动态组件.

当前脚本再执行时,其内部关联的所有动态组件都将再次被重新执行.

:::danger 警告

动态组件是危险的,请确保他仅用于包裹一个可预测的纯组件.
如果组件内额外的执行代码，都将触发重复执行.
生产环境下，即env.NODE_ENV=='production'下，禁用动态模块。

:::

### 文件引入

```ts
import React from "react";
import { createRequire } from "module";
import { BackgroundImage } from 'react-puppeteer'
const require = createRequire(import.meta.url);
export default function App() {
  return (
    <>
      <BackgroundImage url={require("./resources/example.png")} size="100% 100%">
       我有了一个背景图
      </BackgroundImage>
      <img src={require("./resources/example.svg")} />
      <img src={require("./resources/example.png")} />
    </>
  );
}
```

### 截图方块

Puppeteer 截图是默认body

你可以指定截图的元素为`section`

也可以设置`section`为指定的高度

```ts
export default function App({ data }: PropsType) {
  return (
    <div className="text-red-500 p-2 text-xl m-80">Hello, {data.name}!
      <section className="h-[80rem] w-[90rem]">
        嘎嘎
      </section>
    </div>
  )
}
```

```tsx
export class ScreenshotPicture extends Picture {
  getHello(uid: number, Props: Parameters<typeof HelpComponent.default>[0]) {
    return this.screenshot(
      {
        join_dir: 'hello',
        html_name: `${uid}.html`,
        html_body: <HelpComponent {...Props} />
      },
      {
        tab: 'section'
      }
    )
  }
}
```

### 元素插入

```tsx title="./link.tsx"
export const Link = () => {
  return (
    <>
      <link rel="stylesheet" href={require('../../resources/css/hello.css')} />
    </>
  )
}
```

```ts title="./image.tsx"
import { readFileSync } from "fs";
import { Link } from "./link.tsx";
export class ScreenshotPicture extends Picture {
  getHello(uid: number, Props: Parameters<typeof HelpComponent.default>[0]) {
    return this.screenshot(
      {
        // html/hello/uid.html
        join_dir: 'hello',
        html_name: `${uid}.html`,
        html_head: <Link />,
        html_body: <HelpComponent {...Props} />
      }
    )
  }
}
```

### 引用别名

定义一个显示图片的组件

```tsx title="./views/image.tsx"
import React from 'react'
export default () => <div className="show-image"></div>
```

创建一个css文件

> 图片位置./resources/exp.png

```css title="./resources/css/example.main.css"
.show-image {
    // 引入上级目录的图片资源
    background-image: url("../exp.png");
}
```

正常情况下，截图工具是无法识别css内部引用的其他资源的

- 资源的位置随便可能会因为插件位置的改变而改变

- 框架的设计变更也可能发生改变

- 生产的html文件随时会变化

此时，开发者需要借助别名系统，确保资源能正常被识别出来

```tsx
import { dirname, join } from 'path'
import ImageComponent from './views/image.tsx'

// 别名路径
export const paths = {
  // 定位自身的 md文件，并获取目录地址
  '@example': dirname(require('./README.md'))
}

export class ScreenshotPicture extends Picture {
  getHello(uid: number, Props: Parameters<typeof HelpComponent.default>[0]) {
    return this.screenshot({
      // html/hello/uid.html
      join_dir: 'hello',
      html_name: `${uid}.html`,
      // 携带了别名的资源 效果等同 <head />
      html_files: [require('./resources/css/example.main.css')],
      // 设置别名
      file_paths: paths,
      html_head: <Link />,
      html_body: <HelpComponent {...Props} />
    })
  }
}
```

```css title="./resources/css/example.main.css"
.show-image {
    // 在外部资源中使用别名引用
    background-image: url("@example/resources/exp.png");
}
```

## tailwindcss

可以跟talwindcss结合，生产css后，引入到head组件

```sh
yarn add tailwind preline -W
```

- input.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- tailwind.config.js

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
/**
 * @type {import('tailwindcss').Config}
 */
export default {
  // 内容
  content: ['node_modules/preline/dist/*.js', 'src/**/*.{jsx.tsx.html}'],
  plugins: [
    // 组件库  https://preline.co/
    require('preline/plugin')
  ]
}
```

- output

`npx` 本地 `-i` 输入 `-o` 输出 `-m` 压缩

```sh
npx tailwindcss -i ./input.css -o ./output.css -m
```

- link.tsx

```tsx
import React from 'react'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
export const Link = () => {
  return (
    <>
      <link rel="stylesheet" href={require('./output.css')} />
    </>
  )
}
```

## 解析inport image

```sh
yarn add rollup-plugin-img -W
```

- rollup.config.js

```ts
import image from 'rollup-plugin-img'
/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    plugins: [
      // 图片
      image({
        // 转换
        limit: 1024 * 8 * 1000, // default (8*1000 k)
        // 排除
        exclude: 'node_modules/**'
      })
    ]
  }
]
```

- use

```tsx
import url from './test.png'
const Show = () => {
  return <img src={url} />
}
```
