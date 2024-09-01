import React from "react";
import { Flex, FlexProps } from 'reflexy';

import css from './Toobar2.css'

const Toolbar2: React.FC<FlexProps> = (props) => {

  const { ...rest } = props

  return (
    <Flex alignItems="center" {...rest}>
      <ul className={css['actions-container']}>
        <li className={css['action-item']}>
          <a className={[css['action-label'],'codicon','codicon-run'].join(' ')}  href="">运行</a>
        </li>
        <li className={css['action-item']}>
          <a className={[css['action-label'],'codicon', 'codicon-save'].join(' ')} href="">保存</a>
        </li>
        <li className={css['action-item']}>
          <a className={[css['action-label'],'codicon',  'codicon-bracket'].join(' ')} href="">格式化</a>
        </li>
      </ul>
    </Flex>
  )

}
export default Toolbar2;

