import React, { useEffect, useState } from 'react';
import { Button, Flex, Space, Tabs, Tooltip } from 'antd'
import { SplitPane } from '@andrewray/react-multi-split-pane'
import { CloseOutlined } from '@ant-design/icons'

import  { SpanTextStyle }  from './styles.ts'
import BaseInfo from '@/pages/DataStudio/BottomPane/MetadataShow/BaseInfo'
import ColumnInfo from '@/pages/DataStudio/BottomPane/MetadataShow/ColumnInfo'
import { getTableInfoService } from '@/pages/DataStudio/services/DataStudioService.ts'

const {TabPane} = Tabs


const MetadataShow = () => {
  const onTab = (activeKey: string) => {
    console.log('ON TAB Open', activeKey);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);  // 控制按钮是否可见
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleDelete = () => {
    console.log('handle click')
    setIsVisible(false);  // 删除按钮
  };

  if (!isVisible) {
    return null; // 如果按钮被删除，不渲染
  }

  const [tableInfo, setTableInfo] = useState({})
  useEffect(() => {
    async function  fn() {
      const data = await getTableInfoService('t_xxxx')
      setTableInfo(data)
    }
    fn()
  }, []);

  return (
    <>
      <Flex style={{height: parent.innerHeight, overflow: 'auto', position: 'relative'}}>
        <SplitPane
          split='vertical'
          defaultSizes={[50, 500]}
          minSize={50}
          className={'split-pane'}
        >
          <div >
            <Flex vertical>
              <Tooltip title="prompt text" color='#108ee9' placement="right">
                <Button color="default" variant="link"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={isHovered ? handleDelete : undefined}
                >
                  <div className={SpanTextStyle}>table111111111111111111</div>
                  {isHovered && <CloseOutlined /> }
                </Button>
              </Tooltip>
              <Tooltip title="prompt text" color='#108ee9' placement="right">
                <Button color="default" variant="link">
                  <span>tab2222222222222222</span>
                </Button>
              </Tooltip>
              <Tooltip title="prompt text" color='#108ee9' placement="right">
                <Button color="default" variant="link">
                  <span>table3333333</span>
                </Button>
              </Tooltip>
            </Flex>
          </div>
          <div>
            <Space direction="vertical" style={{padding: '10px'}}>
              <Space>
                <div>对象名称: xxxxx</div>
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
                  <BaseInfo />
                </TabPane>

                <TabPane tab="列信息" key="2">
                  <ColumnInfo tableInfo={tableInfo}/>
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
        </SplitPane>
      </Flex>


    </>
  );
};

export default MetadataShow;
