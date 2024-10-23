import React from 'react'
import { Space, Tabs } from 'antd'
import MetadataShow from '@/pages/DataStudio/BottomPane/MetadataShow/MetadataShow.tsx'
import { TableSheet } from '@/components/TableSheet'
import { DataResult } from '@/pages/DataStudio/DataResult'
import { useGetActiveTabs } from '@/pages/DataStudio/hooks/useGetActiveTabs.ts'
import { useAppDispatch } from '@/store'
import { updateMetaResultTabsActiveKey } from '@/pages/DataStudio/store/DataStudioSlice.ts'


export enum BottomTabType {
  META= 'meta',
  RESULT= 'result',
}


const BottomPane = () => {

  const dispatch = useAppDispatch()

  const onTab = (activeKey: string) => {
    console.log('ON TAB Open', activeKey);
    dispatch(updateMetaResultTabsActiveKey(activeKey))
  };

  const { metaResultActiveTab } = useGetActiveTabs() || BottomTabType.META

  const items = [
    {
      key: BottomTabType.META,
      label: '元数据',
      children: <div style={{padding: '5px 0', paddingTop: '1px solid #eee'}}>
        <MetadataShow/>
      </div>
    },
    {
      key: BottomTabType.RESULT,
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
          // defaultActiveKey="2"
          activeKey={metaResultActiveTab}
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
