import React from 'react';
import { SplitPane } from '@andrewray/react-multi-split-pane'
import PaneLeft from '@/views/DataStudio/PaneLeft'
import PaneRight from '@/views/DataStudio/PaneRight'
import { Flex } from 'antd'
import DatabaseTree from '@/views/DataStudio/DatabaseTree'

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
