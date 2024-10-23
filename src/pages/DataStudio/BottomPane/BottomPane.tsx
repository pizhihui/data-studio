import React from 'react'
import { Space, Tabs } from 'antd'
import MetadataShow from '@/pages/DataStudio/BottomPane/MetadataShow/MetadataShow.tsx'
import { TableSheet } from '@/components/TableSheet'
import { DataResult } from '@/pages/DataStudio/DataResult'
import { useGetActiveTab } from '@/pages/DataStudio/hooks/useGetActiveTab.ts'
import { useAppDispatch } from '@/store'
import { updateMetaResultTabsActiveKey } from '@/pages/DataStudio/store/DataStudioSlice.ts'


export enum BottomTabType {
  META = 'meta',
  RESULT = 'result',
}

type PropsType = {
  height?: number
}


const BottomPane: React.FC<PropsType> = ({height}) => {

  const dispatch = useAppDispatch()

  const onTab = (activeKey: string) => {
    dispatch(updateMetaResultTabsActiveKey(activeKey))
  };

  const {metaResultActiveTab} = useGetActiveTab() || BottomTabType.META

  const items = [
    {
      key: BottomTabType.META,
      label: '元数据',
      children:
        <div style={{ height:height+'px', padding: '5px 0', paddingTop: '1px solid #eee'}}>
          <MetadataShow />
        </div>
    },
    {
      key: BottomTabType.RESULT,
      label: '结果',
      children:
        <div style={{height:height+'px',padding: '5px 0', paddingTop: '1px solid #eee'}}>
          <DataResult/>
        </div>
    }
  ]

  return (
    <>
      <Tabs
        type="line"
        size="small"
        // defaultActiveKey="2"
        activeKey={metaResultActiveTab}
        onTabClick={onTab}
        onChange={onTab}
        style={{height: '100%', padding: '0 9px'}}
        items={items}
      />
    </>
  );
};

export default BottomPane;
