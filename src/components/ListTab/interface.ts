
// 定义 Tab 的类型
import React from 'react'

export interface TabType {
  id: string
  label: string
  content?: string
  children?: React.ReactNode
}
