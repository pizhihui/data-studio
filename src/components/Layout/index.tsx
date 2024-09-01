import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { Menu, Layout, Avatar, Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd'
import { useStore } from '@/store'
// import './index.css'

import css from './index.css'

// @ts-ignore
import logo from '@/assets/images/hulianLogo.png'
import { User } from '@/services/types/api';

const { Header, Content, Footer } = Layout;

const LayoutContainer: React.FC = () => {

  const { userInfo, updateUserInfo } = useStore()

  useEffect(() => {
    console.log('use effect.....', userInfo)
  }, [])

  const items = [
    {
      key: 1,
      label: `nav 1`,
    },
    {
      key: 2,
      label: `nav 2`,
    }
  ]

  const rightItems: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：' + '912223422@qq.com'
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]

  // const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  // const [color, setColor] = useState(ColorList[0]);
  // setColor(ColorList[0]);


  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      // storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }

  const rightItems2: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  const handleBtnClick = () => {
    console.log('clic........', userInfo)
    const user: User.UserItem = {
      _id: '001',
      userId: 0,
      userName: 'pizhihui',
      userEmail: 'pizhihui@juzishuke.com',
      deptId: '111',
      state: 1,
      mobile: '189107771312',
      job: 'engineer',
      role: 0,
      roleList: '',
      createId: 0,
      deptName: '总部',
      userImg: 'xxxx'
    }
    updateUserInfo(user)

    console.log('clic.xxxx.......', userInfo)

  }

  const levelMenuProps = {
    items:rightItems,
    onClick: handleMenuClick,
  };

  return (
    <Layout>
      {/*<Header className="header-container">*/}
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className={css.headerleft}>
          <div className={css.headerleftlogo}>
            <img className={css.headerleftlogoimg} src={logo} alt=""/>
          </div>
        </div>
        <div className={css.headermenu}>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
            // style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        <div className={css.headerright}>
          <Dropdown menu={ levelMenuProps } trigger={['hover']} placement="bottom">
            <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
              Tom
            </Avatar>
          </Dropdown>
        </div>
      </Header>
      <Content style={{
      }}>
        <div
          style={{
            // background: 'lightblue',
            // minHeight: 520,
            borderRadius: 0,
          }}
        >
          <Outlet/>
        </div>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        互联数据平台 ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}

export default LayoutContainer
