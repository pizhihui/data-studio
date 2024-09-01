import Splitter from '@/components/Splitter';
import React from 'react';
import LeftContainer from '@/views/Home/components/LeftContainer';
import MiddleContainer from '@/views/Home/components/MiddleContainer';
import Split from '@uiw/react-split';
import { Flex } from 'reflexy';

import css from './index.css'
import TreeContainer from "@/views/Home/components/TreeContainer";
import TreeAntd from "./components/TreeContainer/TreeAntd";

const Home: React.FC = () => {

  const updatePrimaryPaneSize = () => {
    console.log('helool')
  }

  return (
    /*<Splitter primary="second"
              minSize={100}
              maxSize={-100}
              defaultSize="calc(100vw - 225px)"
      // size={uiStore.primaryPaneSize}
      // onDragFinished={uiStore.updatePrimaryPaneSize}
    >
      <LeftContainer />
      <MiddleContainer />
    </Splitter>*/
    <Splitter
      primary="second"
      minSize={100}
      maxSize={-100}
      defaultSize="calc(100vw - 225px)"
      size={200}
      onDragFinished={updatePrimaryPaneSize}
    >
      {/* 第一部分 */}
      <Flex alignItems="flex-start" vfill className={css['sider-container']}>
        <div style={{ height:'100%' }}>
          <ul style={{ padding: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column'  }}>
            <li>
              <a href="" className='codicon-schema-explorer-nav' style={{ display: 'flex', alignItems:'center' , justifyContent:'center', width: '44px',height: '44px' }}></a>
            </li>
            <li>
              <a href="" className='codicon codicon-explorer-view-icon'
                 style={{ display: 'flex', alignItems:'center' ,
                   justifyContent:'center',
                   width: '44px',
                   height: '44px',
                   backgroundColor: '#eff3f8'
              }}></a>
            </li>
          </ul>
        </div>
      </Flex>
      {/* 第二部分 */}
      <Flex fill={true} column hfill className={css.baseContent}>
        <TreeContainer />
        {/*<TreeAntd />*/}
      </Flex>
      {/* 第三部分 */}
      <div style={{ flex: 2 }}>Pane 3</div>
    </Splitter>
  )
}

export default Home
