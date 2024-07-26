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
