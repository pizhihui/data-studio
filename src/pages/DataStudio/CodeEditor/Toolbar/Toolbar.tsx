import React from "react";

import css from './Toobar.module.css'
import {Flex} from 'antd'


export enum ActionType {
  RunCurrent = 1,
  RunAll =2,
  Save = 3,
  FullScreen = 4
}

type ToolbarPropsType = {
  onAction: (action: ActionType) => void
}



const Toolbar: React.FC<ToolbarPropsType> = (props) => {
  const {
    onAction
  } = props

  function onRunClick() {
    onAction(ActionType.RunCurrent)
  }

  return (
    <Flex>
      <ul className={css['actions-container']}>
        <li className={css['action-item']}>
          <button className={[css['action-label'],'codicon','codicon-run'].join(' ')}  onClick={onRunClick}>运行</button>
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

