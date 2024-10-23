import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store'
import { TableSheet } from '@/components/TableSheet'
import { S2DataConfig } from '@antv/s2'
import { Empty } from 'antd'
import { ListTabs } from '@/components/ListTab'
import {
  removeMetaTabAction, removeResultTabAction,
  updateMetaTabsActiveKey,
  updateResultTabsActiveKey
} from '@/pages/DataStudio/store/DataStudioSlice.ts'
import { useGetTabsList } from '@/pages/DataStudio/hooks/useGetTabsList.ts'
import { TabType } from '@/components/ListTab/interface.ts'
import DataResultTabs from '@/pages/DataStudio/DataResult/DataResultTabs.tsx'
import { useGetActiveTab } from '@/pages/DataStudio/hooks/useGetActiveTab.ts'

const DataResult = () => {
  const dispatch = useAppDispatch()

  const metaTabs = useAppSelector((state) => state.dataStudio.metaListTabs)
  const metaActiveTab = useAppSelector((state) => state.dataStudio.metaActiveTab)

  const {resultListTabs} = useGetTabsList()
  const {resultActiveTab} = useGetActiveTab()

  // const [activeTab, setActiveTab] = useState<string>(metaTabs[0]?.id || '');

  // 删除
  const handleTabClose = (id: string, e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    dispatch(removeResultTabAction(id)); // 使用 Redux action 删除 tab
    if (metaActiveTab === id) {
      const remainingTabs = metaTabs.filter(tab => tab.id !== id);
      if (remainingTabs.length > 0) {
        dispatch(updateResultTabsActiveKey(remainingTabs[0].id))
      } else {
        dispatch(updateResultTabsActiveKey(''))
      }
    }
  };
  const handleTabClick = (id: string) => {
    dispatch(updateResultTabsActiveKey(id))
  };

  // ****** 加入每个 tab 显示内容的渲染
  const tabItems = resultListTabs.map((item: TabType) => {
    return {
      ...item,
      children: <DataResultTabs label={item.label}/>
    }
  })

  return (
    <>
      {/*<TableSheet data={queryResTabs} />*/}
      {resultListTabs.length <= 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
        <ListTabs items={tabItems} activeTab={resultActiveTab} onTabClick={handleTabClick} onTabClose={handleTabClose}/>
    </>
  );
};

export default DataResult;
