import { PuppeteerLaunchOptions } from 'puppeteer'
import { Component } from './component'
import { Puppeteer } from './puppeteer'
/**
 * 截图类
 */
export class Picture {
  /**
   * 浏览器控制
   */
  Pup: typeof Puppeteer.prototype
  /**
   * 组件控制
   */
  Com: typeof Component.prototype
  /**
   * 初始化组件和浏览器
   */
  constructor(launch?: PuppeteerLaunchOptions) {
    this.Com = new Component()
    this.Pup = new Puppeteer(launch)
  }
}
