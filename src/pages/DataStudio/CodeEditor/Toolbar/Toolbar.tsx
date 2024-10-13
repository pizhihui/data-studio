import React from "react";

import css from './Toobar.module.css'
import {Flex} from 'antd'


type ToolbarPropsType = {
  onRun: () => void
}

const Toolbar: React.FC<ToolbarPropsType> = (props) => {
  const {
    onRun
  } = props

  return (
    <Flex>
      <ul className={css['actions-container']}>
        <li className={css['action-item']}>
          <button className={[css['action-label'],'codicon','codicon-run'].join(' ')}  onClick={onRun}>运行</button>
        </li>
        <li className={css['action-item']}>
          <button className={[css['action-label'],'codicon', 'codicon-save'].join(' ')} >保存</button>
        </li>
        <li className={css['action-item']}>
          <button className={[css['action-label'],'codicon',  'codicon-bracket'].join(' ')} >格式化</button>
        </li>
      </ul>
    </Flex>
  )

}
export default Toolbar;

