import React from 'react'
import { defineConfig, createRequire } from 'react-puppeteer'
const Music = () => {
  return <div> 我的音乐</div>
}

const require = createRequire(import.meta.url)

const url = require('./public/main.css')
console.log('require', url)

export default defineConfig([
  {
    url: '/music',
    options: {
      html_body: (
        <div>
          <Music />
          <img src={url}></img>
        </div>
      )
    }
  }
])
