import React from 'react';
import { SplitPane } from '@andrewray/react-multi-split-pane'
import PaneLeft from '@/pages/DataStudio/PaneLeft'
import PaneRight from '@/pages/DataStudio/PaneRight'
import { Flex } from 'antd'
import DatabaseTree from '@/pages/DataStudio/DatabaseTree'

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
            sql editor
          </div>
        </SplitPane>
      </Flex>
    </>
  );
};

export default EditorSpace;
