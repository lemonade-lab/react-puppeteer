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
import Hello, { PropsType } from './hello.tsx'
export class Image extends Picture {
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
    createHello(uid: number, Props: PropsType) {
        // 生成 html 地址 或 html字符串
        const Address = this.Com.create(<Hello {...Props} />, {
            // html/hello/uid.html
            join_dir: 'hello',
            html_name: `${uid}.html`,
        })
        return this.Pup.render(Address)
    }
}
// 初始化 图片生成对象
export const imgae = new Image()
```
