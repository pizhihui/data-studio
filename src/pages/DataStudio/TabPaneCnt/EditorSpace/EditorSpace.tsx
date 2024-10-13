import React from 'react';
import { SplitPane } from '@andrewray/react-multi-split-pane'
import { Flex, Splitter, Typography } from 'antd';
import DatabaseTree from '@/pages/DataStudio/DatabaseTree'
import BottomPane from '@/pages/DataStudio/BottomPane'
import CodeEditor from '@/pages/DataStudio/CodeEditor'

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const EditorSpace = () => {
  return (
    <>
      <Flex style={{height: parent.innerHeight, overflow: 'auto', position: 'relative'}}>
        <SplitPane
          split={'vertical'}
          defaultSizes={[10, 20]}
          minSize={220}
          className={'split-pane'}
        >
          <DatabaseTree />
          <div>
            <SplitPane
              split={'horizontal'}
              defaultSizes={[100, 500]}
              minSize={200}
              className={'split-pane'}
            >
              {/* sql编辑区域 */}
              <CodeEditor />
              {/* 下方区域: 元数据展示,查询结果展示 */}
              <BottomPane />
            </SplitPane>
            {/*<Splitter layout="vertical" style={{ height: 'calc(100vh - 100px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Splitter.Panel defaultSize='50%' min='10%' max='70%'>
                <Desc text="First" />
              </Splitter.Panel>
              <Splitter.Panel defaultSize='50%' min='10%' max='70%'>
                <Desc text="Second" />
              </Splitter.Panel>
            </Splitter>*/}
          </div>
        </SplitPane>
      </Flex>
    </>
  );
};

export default EditorSpace;
