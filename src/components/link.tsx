import React from 'react'
import { createRequire } from '../utils/module.js'
const require = createRequire(import.meta.url)
/**
 * 得到基础link组件
 * @returns
 */
export const Link = () => {
  return (
    <>
      <link rel="stylesheet" href={require('../../public/main.css')} />
    </>
  )
}
