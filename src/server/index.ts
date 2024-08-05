import Koa from 'koa'
import KoaStatic from 'koa-static'
import Router from 'koa-router'
import { join } from 'path'
import mount from 'koa-mount'
import { Component } from '../component.js'
import { existsSync } from 'fs'

const PATH = process.cwd().replace(/\\/g, '\\\\')

const state = '/file'

/**
 *
 * @param Router
 * @returns
 */
const Dynamic = async (URL: string) => {
  const modulePath = `file://${URL}?update=${Date.now()}`
  return (await import(modulePath))?.default
}

/**
 *
 * @param Port
 */
export async function createServer(Port = 8080) {
  const Com = new Component()
  const app = new Koa()
  const router = new Router()

  let URI = join(process.cwd(), 'routes.config.tsx')

  if (!existsSync(URI)) URI = join(process.cwd(), 'routes.config.jsx')
  if (!existsSync(URI)) return

  const routes = await Dynamic(URI)

  // 不存在
  if (!routes) return

  console.log('_______react-puppeteer_______')
  //
  for (const route of routes) {
    console.log(`http://127.0.0.1:${Port}${route.url}`)
    router.get(route.url, async ctx => {
      // 动态加载
      const routes = await Dynamic(URI)
      // 不存在
      if (!routes) return
      // 不是数组
      if (!Array.isArray(routes)) return
      // 查找
      const item = routes.find(i => i.url == route.url)
      // 丢失了
      if (!item) return
      const options = item?.options ?? {}
      const HTML = Com.compile({
        ...options,
        file_create: false,
        server: true
      })
      // 置换为file请求
      ctx.body = HTML
    })
  }

  // static
  app.use(mount(state, KoaStatic(PATH)))

  // routes
  app.use(router.routes())

  // listen 8000
  app.listen(Port, () => {
    console.log('Server is running on port ' + Port)
    console.log('自行调整默认浏览器尺寸 800 X 1280 100%')
    console.log('_______react-puppeteer_______')
  })
}
