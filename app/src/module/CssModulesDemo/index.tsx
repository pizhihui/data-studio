import React from 'react'
import css from './index.css'
import { Flex } from 'reflexy';


export default function CssMododulesDemo() {

  return (
    <div>
      <Flex row hfill style={{ height: '40%' }}>
        <div className={css.box}>
          hello
        </div>
      </Flex>
      <Flex row hfill style={{ height: '40%' }}>
        <div>
          tablexxxxxxxxxxxxxxx
        </div>
      </Flex>
    </div>
  )
}

