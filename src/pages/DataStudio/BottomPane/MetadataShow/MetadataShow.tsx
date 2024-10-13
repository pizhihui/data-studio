import React from 'react'
import {Empty, Tabs} from 'antd'
import {ListTabs} from '@/components/ListTab'
import {useAppDispatch, useAppSelector} from '@/store'
import {removeMetaTabAction, updateMetaTabsActiveKey} from '@/pages/DataStudio/store/DataStudioSlice.ts'
import {TabType} from '@/components/ListTab/interface.ts'
import MetadataContent from '@/pages/DataStudio/BottomPane/MetadataShow/MetadataContent.tsx'

const MetadataShow = () => {

  const dispatch = useAppDispatch()
  const metaTabs = useAppSelector((state) => state.dataStudio.metaListTabs)
  const metaActiveTab = useAppSelector((state) => state.dataStudio.metaActiveTab)

  // const [activeTab, setActiveTab] = useState<string>(metaTabs[0]?.id || '');

  // 删除
  const handleTabClose = (id: string, e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    dispatch(removeMetaTabAction(id)); // 使用 Redux action 删除 tab
    // 确保 activeTab 不会设置为已删除的 tab
    if (metaActiveTab === id) {
      // 获取当前 tabs
      const remainingTabs = metaTabs.filter(tab => tab.id !== id);
      // 设置下一个激活的 tab
      if (remainingTabs.length > 0) {
        // 设置下一个 tab 为激活状态
        dispatch(updateMetaTabsActiveKey(remainingTabs[0].id))
      } else {
        dispatch(updateMetaTabsActiveKey(''))
      }
    }
  };
  const handleTabClick = (id: string) => {
    // setActiveTab(id);
    dispatch(updateMetaTabsActiveKey(id))
  };

  // ****** 加入每个 tab 显示内容的渲染
  const tabItems = metaTabs.map((item: TabType) => {
    return {
      ...item,
      children: <MetadataContent label={item.label}/>
    }
  })

  return (
    <>
      {metaTabs.length <= 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
      <div style={{height: '80vh'}}>
        <ListTabs items={tabItems} activeTab={metaActiveTab} onTabClick={handleTabClick} onTabClose={handleTabClose}/>
      </div>
    </>
  )
};

export default MetadataShow;
