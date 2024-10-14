import React, { useEffect, useState } from 'react';
import { SplitPane } from '@andrewray/react-multi-split-pane';
import { Flex } from 'antd';
import { getDbsTreeService } from '@/pages/DataStudio/services/DataStudioService.ts'
import { VIEW } from '@/pages/DataStudio/model.ts'
import { useAppDispatch } from '@/store'
import { updateToolContentHeightReducer } from '@/pages/DataStudio/store/DataStudioSlice.ts'
import ProjectPane from '@/pages/DataStudio/ProjectPane'
import WorkbenchPane from '@/pages/DataStudio/WorkbenchPane'
import { Allotment } from 'allotment'

const DataStudio = () => {


  const getClientSize = () => ({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    contentHeight:
      document.documentElement.clientHeight -
      VIEW.headerNavHeight -
      VIEW.headerHeight -
      VIEW.footerHeight -
      VIEW.otherHeight
  });

  useEffect(() => {
    getDbsTreeService().then(res => {
      // console.log('获取到数据', res.dbs)
    })
  }, []);

  const dispath = useAppDispatch()


  const [size, setSize] = useState(getClientSize());

  const onResize = () => {
    setSize(getClientSize());
    const isProject = false
    // const newBottomHeight = !isProject
    //   ? 0
    //   : bottomContainer.selectKey === ''
    //     ? 0
    //     : bottomContainer.height;
    const centerContentHeight = getClientSize().contentHeight - 0;
    // updateCenterContentHeight(centerContentHeight);
    // updateToolContentHeight(centerContentHeight - VIEW.leftMargin);
    const height = centerContentHeight - VIEW.leftMargin
    console.log('resizexxxxx', height)
    dispath(updateToolContentHeightReducer(height))
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/*<Flex style={{height: parent.innerHeight - 55, overflow: 'auto', position: 'relative'}}>*/}
      <Flex style={{height: parent.innerHeight - 55}}>
        {/*<SplitPane
          split={'vertical'}
          defaultSizes={[100, 500]}
          minSize={200}
          className={'split-pane'}
        >
          <ProjectPane />
           <WorkbenchPane />
        }*/ }

        <Allotment>
          <Allotment.Pane minSize={90} maxSize={300}>
            <ProjectPane />
          </Allotment.Pane>
          <Allotment.Pane>
            <WorkbenchPane />
          </Allotment.Pane>
        </Allotment>
      </Flex>

    </>
  );
};

export default DataStudio;
