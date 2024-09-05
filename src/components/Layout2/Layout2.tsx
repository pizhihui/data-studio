import React, { useRef, useState } from 'react';
import { Flex, Layout, Menu, MenuProps, Tabs } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import { ButtonStyle, HeaderSticky, RootVh } from './styles'
import Home from '@/views/Home';

import { SplitPane } from '@andrewray/react-multi-split-pane';
import { Pane } from 'react-split-pane';
import { ProCard } from '@ant-design/pro-components';
import DirectoryTree from 'antd/es/tree/DirectoryTree';
import { LeftSide } from '@/views/Home/route.tsx';
const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));





const Layout2 = () => {


  const [currentKey, setCurrentKey] = useState<string>('project')


  const updateSelectLeftKey = (item: string) => {
    console.log('current key', item)
    setCurrentKey(item)
  }

  const LeftTopMenu = (
    <Menu
      mode='inline'
      items={LeftSide
        .map((x) => ({
          key: x.key,
          label: x.label,
          icon: x.icon
        }))}
      style={{
        flexGrow: 1,
        borderBlockStart: `1px solid #eee`,
        borderInlineEnd: `1px solid #eee`
      }}
      onClick={(item) => updateSelectLeftKey(item.key)}
    />
  );

  const refObject = useRef<HTMLDivElement>(null);


  return (
    <Layout className={RootVh}>
      <Header>
        <Flex>
          <div className="demo-logo" style={{color: 'white'}}>logooooo</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
            style={{flex: 1, minWidth: 0}}

          />
        </Flex>
      </Header>
     <Layout>
       <Sider collapsed collapsedWidth={40}>
         <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
           {LeftTopMenu}
         </div>
       </Sider>
       <Content style={{height: parent.innerHeight - 64, overflow: 'auto', position: 'relative'}}>
         <SplitPane
           split={'vertical'}
           defaultSizes={[100, 500]}
           minSize={150}
           className={'split-pane'}
         >
           <div>
             <Tabs activeKey={currentKey} items={LeftSide} tabBarStyle={{ display: 'none' }} />
           </div>
           <SplitPane
             split={'horizontal'}
             defaultSizes={[100, 500]}
             minSize={100}
             className={'split-pane'}
           >
             <div>
               pane222222222222-11111111
             </div>
             <div>
               pane222222222222-33333333
             </div>
           </SplitPane>
         </SplitPane>
       </Content>
     </Layout>
    </Layout>
  )
}

export default Layout2

