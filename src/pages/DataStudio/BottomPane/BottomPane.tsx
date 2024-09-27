import React from 'react';
import { Space, Tabs } from 'antd'
import MetadataShow from '@/pages/DataStudio/BottomPane/MetadataShow/MetadataShow.tsx'

const {TabPane} = Tabs;

const BottomPane = () => {
  const onTab = (activeKey: string) => {
    console.log('ON TAB Open', activeKey);
  };
  return (
    <>
      <div>
        <div style={{padding: '0 8px'}}>
          <Tabs
            type='line'
            size="small"
            defaultActiveKey="1"
            onTabClick={onTab}
            onChange={onTab}
            style={{height: '100%'}}
            destroyInactiveTabPane
          >
            <TabPane tab="元数据" key="1">
              <div style={{padding: '5px 0', paddingTop: '1px solid #eee'}}>
                <MetadataShow />
              </div>
            </TabPane>
            <TabPane tab="结果" key="2">
              <div style={{padding: '5px 0', paddingTop: '1px solid #eee'}}>
                结果
              </div>
            </TabPane>
          </Tabs>
        </div>

      </div>
    </>
  );
};

export default BottomPane;
