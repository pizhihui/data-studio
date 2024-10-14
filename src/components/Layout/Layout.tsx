import React from 'react';
import { Flex, Layout as AntdLayout, Menu, MenuProps } from 'antd';
import { Outlet } from 'react-router';
const { Header, Footer, Sider, Content } = AntdLayout;


const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const Layout = () => {
  return (
    <>
     <div>
       <AntdLayout>
         {/* header */}
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
         {/* main container */}
         <AntdLayout>
           <Content style={{height: 'calc(100vh - 55px)'}}>
             {/* router render */}
             <Outlet />
           </Content>
         </AntdLayout>
       </AntdLayout>
     </div>
    </>
  );
};

export default Layout;
