# React-Puppeteer

## 使用教程

- install

```sh
npm install react puppeteer react-puppeteer
```

- react-puppeteer-env.d.ts

```ts
/// <reference types="react-puppeteer/env" />
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
        return this.Pup.screenshot(<HelpComponent {...Props} />, {
            // html/hello/uid.html
            join_dir: 'hello',
            html_name: `${uid}.html`,
        })
    }

}
// 初始化 图片生成对象
export const Imgae = new ScreenshotPicture()
```
