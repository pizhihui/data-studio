import React from 'react';
import { Space, Tabs } from 'antd'
import MetadataShow from '@/pages/DataStudio/BottomPane/MetadataShow/MetadataShow.tsx'
import { TableSheet } from '@/components/TableSheet'
import { DataResult } from '@/pages/DataStudio/DataResult'

const {TabPane} = Tabs;

const BottomPane = () => {
  const onTab = (activeKey: string) => {
    console.log('ON TAB Open', activeKey);
  };

  const items = [
    {
      key: '1',
      label: '元数据',
      children: <div style={{padding: '5px 0', paddingTop: '1px solid #eee'}}>
        <MetadataShow/>
      </div>
    },
    {
      key: '2',
      label: '结果',
      children: <div style={{padding: '5px 0', paddingTop: '1px solid #eee'}}>
        <DataResult/>
      </div>
    }
  ]

  return (
    <>
      <div style={{padding: '0 8px'}}>
        <Tabs
          type="line"
          size="small"
          defaultActiveKey="2"
          onTabClick={onTab}
          onChange={onTab}
          // style={{height: '100%'}}
          items={items}
        />
      </div>
    </>
  );
};

export default BottomPane;
