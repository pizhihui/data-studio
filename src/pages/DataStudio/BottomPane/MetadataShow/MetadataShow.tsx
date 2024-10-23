import React from 'react'
import {Empty, Tabs} from 'antd'
import {ListTabs} from '@/components/ListTab'
import {useAppDispatch, useAppSelector} from '@/store'
import {removeMetaTabAction, updateMetaTabsActiveKey} from '@/pages/DataStudio/store/DataStudioSlice.ts'
import {TabType} from '@/components/ListTab/interface.ts'
import MetadataTabs from '@/pages/DataStudio/BottomPane/MetadataShow/MetadataTabs.tsx'

const MetadataShow = () => {

  const dispatch = useAppDispatch()
  const metaTabs = useAppSelector((state) => state.dataStudio.metaListTabs)
  const metaActiveTab = useAppSelector((state) => state.dataStudio.metaActiveTab)

  // const [activeTab, setActiveTab] = useState<string>(metaTabs[0]?.id || '');

  // 删除
  const handleTabClose = (id: string, e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    dispatch(removeMetaTabAction(id)); // 使用 Redux action 删除 tab
    if (metaActiveTab === id) {
      const remainingTabs = metaTabs.filter(tab => tab.id !== id);
      if (remainingTabs.length > 0) {
        dispatch(updateMetaTabsActiveKey(remainingTabs[0].id))
      } else {
        dispatch(updateMetaTabsActiveKey(''))
      }
    }
  };
  const handleTabClick = (id: string) => {
    dispatch(updateMetaTabsActiveKey(id))
  };

  // ****** 加入每个 tab 显示内容的渲染
  const tabItems = metaTabs.map((item: TabType) => {
    return {
      ...item,
      children: <MetadataTabs label={item.label}/>
    }
  })

  return (
    <>
      {metaTabs.length <= 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
        <ListTabs items={tabItems} activeTab={metaActiveTab} onTabClick={handleTabClick} onTabClose={handleTabClose}/>
    </>
  )
};

export default MetadataShow;
