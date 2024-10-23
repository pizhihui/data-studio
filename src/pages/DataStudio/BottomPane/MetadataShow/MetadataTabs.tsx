import React from 'react';
import {Space, Tabs} from 'antd'
import BaseInfo from '@/pages/DataStudio/BottomPane/MetadataShow/BaseInfo'
import ColumnInfo from '@/pages/DataStudio/BottomPane/MetadataShow/ColumnInfo'
const {TabPane} = Tabs

type PropsType = {
  label: string
}

const MetadataTabs: React.FC<PropsType> = (props) => {

  const {
    label
  } = props

  const onTab = (activeKey: string) => {
    console.log('ON TAB Open', activeKey);
  };

  return (
    <div>
      <Space direction="vertical" style={{padding: '10px'}}>
        <Space>
          <div>对象名称: {label}</div>
          <div>负责人:xxxxx</div>
        </Space>
        <Tabs
          type="card"
          size="small"
          defaultActiveKey="1"
          onTabClick={onTab}
          onChange={onTab}
          style={{height: '100%'}}
        >
          <TabPane tab="基础信息" key="1">
            <BaseInfo/>
          </TabPane>

          <TabPane tab="列信息" key="2">
            <ColumnInfo/>
          </TabPane>

          <TabPane tab="分区" key="3">
            分区
          </TabPane>

          <TabPane tab="生成 DDL" key="4">
            生成 DDL
          </TabPane>
        </Tabs>
      </Space>
    </div>
  );
};

export default MetadataTabs;
