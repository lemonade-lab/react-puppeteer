import React from 'react'
import { MainCSS } from '../css.url'
/**
 * 得到基础link组件
 * @returns
 */
export const Link = () => {
  return (
    <>
      <link rel="stylesheet" href={MainCSS} />
    </>
  )
}
