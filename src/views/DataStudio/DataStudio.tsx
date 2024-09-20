import React from 'react';
import { SplitPane } from '@andrewray/react-multi-split-pane';
import { Flex } from 'antd';
import PaneLeft from '@/views/DataStudio/PaneLeft';
import PaneRight from '@/views/DataStudio/PaneRight';

const DataStudio = () => {
  return (
    <>
      <Flex style={{height: parent.innerHeight - 55, overflow: 'auto', position: 'relative'}}>
        <SplitPane
          split={'vertical'}
          defaultSizes={[100, 500]}
          minSize={200}
          className={'split-pane'}
        >
          <PaneLeft />
          <PaneRight/>
        </SplitPane>
      </Flex>

    </>
  );
};

export default DataStudio;
