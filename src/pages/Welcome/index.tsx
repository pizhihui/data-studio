import React from 'react';
import Splitter from '@/components/Splitter';

import css from './index.module.css'
import classNames from 'classnames';

const Welcome: React.FC = () => {

  const clasName = classNames(css.div1)
  console.log('class name......', css)
  console.log('class name......', clasName)
  return (
    <div className={css.div1}>
      <div>
        hello
      </div>
      <div>
        world
      </div>
    </div>
  )
}

export default Welcome
