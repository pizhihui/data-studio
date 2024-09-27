import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '表大小',
    children: <p>Zhou Maomao</p>,
    contentStyle: { paddingBottom: 0},
    labelStyle: { paddingBottom: 0},
  },
  {
    key: '2',
    label: '创建时间',
    children: <p>1810000000</p>,
  },
  {
    key: '3',
    label: 'DDL 最近更新时间',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    label: '数据最近更新时间',
    children: <p>empty</p>,
  },
  {
    key: '5',
    label: '生命周期',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
  {
    key: '6',
    label: '表类型',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
  {
    key: '7',
    label: '表说明',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
];

const BaseInfo = () => {
  return (
    <div style={{padding: '10px'}} className='base-info-container'>
      <Descriptions size='small' items={items} span={2} column={1}
                    contentStyle={{fontSize: '12px', paddingBottom: 0}}
                    labelStyle={{fontSize: '12px', width:'120px'}}/>
    </div>
  )
};

export default BaseInfo;
