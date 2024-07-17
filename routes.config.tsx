import React from 'react'
import { defineConfig } from './src/index.js'
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
