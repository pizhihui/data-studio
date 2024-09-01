import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';

import './index.css'

const LeftContainer: React.FC = () => {

  const changeTabPosition = (e: RadioChangeEvent) => {
    console.log('change tab', e.target.value);
  };


  const changeKey = (key: string) => {
    console.log('change key.....', key)
  }

  return (
    <div className='left-container'>
      <Tabs
        tabPosition='left'
        size='middle'
        type='line'
        // animated={{ inkBar: false, tabPane: false }}
        indicator={{ size: (origin) => origin + 0, align: 'center' }}
        tabBarGutter={40}
        // tabBarStyle={{
        //   backgroundColor: 'pink',
        //   borderBottom: 'unset'
        // }}
        onChange={changeKey}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </div>
  )
}

export default LeftContainer



