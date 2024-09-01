import Splitter from '@/components/Splitter';
import React from 'react';
import LeftContainer from '@/views/Home/components/LeftContainer';
import MiddleContainer from '@/views/Home/components/MiddleContainer';
import Split from '@uiw/react-split';

import './index.css'
import TreeContainer from "@/views/Home/components/TreeContainer";
import TreeAntd from "./components/TreeContainer/TreeAntd";

const Home: React.FC = () => {


  const handleClick = (e: any) => {
    console.log('clickaaaaa', e)
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
    <Split visiable={[3]}
           style={{
      border: '1px solid #d5d5d5',
      borderRadius: 3,
      margin: 10

    }}>
      {/* 第一部分 */}
      <div style={{
        width: '44px',
        backgroundColor: '#eaeaea',
        borderRight: '1px solid rgb(207, 211, 230)'
      }}>
        <div style={{ height:'100%' }}>
          <ul style={{
            padding: '0',
            listStyleType: 'none',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <li>
              <a href="#"
                 className={['codicon','codicon-files'].join(' ')}
                 style={{ display: 'flex',
                   alignItems:'center' ,
                   justifyContent:'center',
                   width: '44px',
                   height: '44px',
                   fontSize: '24px'
              }}
              onClick={handleClick}
              >
              </a>
            </li>
            <li>
              <a href="#"
                 className={['codicon','codicon-server'].join(' ')}
                 style={{ display: 'flex', alignItems:'center' ,
                   justifyContent:'center',
                   width: '44px',
                   height: '44px',
                   backgroundColor: '#eff3f8',
                   fontSize: '24px'
              }}
                 onClick={handleClick}
              >
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* 第二部分 */}
      <div style={{
        minWidth: '400px',
        height: 'calc(100vh - 130px)'
        // minHeight: '600px'
      }}>
        <TreeContainer />
        {/*<TreeAntd />*/}
      </div>
      {/* 第三部分 */}
      <div style={{ flex: 2 }}>
        <MiddleContainer />
      </div>
    </Split>
  )
}

export default Home
