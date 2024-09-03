import React, { DetailedReactHTMLElement, ReactNode, useState } from 'react';
import { Dropdown, Tooltip, theme, Divider, Space, Button } from 'antd';
import { Flex } from 'reflexy';
import { Databases } from '@/services';
import ContextMenu, { ContextMenuProps, TableAction } from './ContextMenu';
import css from './TableTitle.css';
import {
  BookOutlined,
  CloudOutlined, DownOutlined,
  EyeOutlined,
  FireOutlined,
  ForkOutlined,
  GatewayOutlined,
  ReadOutlined,
  ShopOutlined,
  SmallDashOutlined,
  TableOutlined
} from '@ant-design/icons';

type Props = ContextMenuProps;
import type { MenuProps } from 'antd';
import { message } from '@/utils/AntdGlobal';
const { useToken } = theme;



const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const TableTitle = (props: any) => {

  const { table,onContextMenuAction, ...rest } = props;

  const { token } = useToken();

  const [visible, setVisible] = useState<boolean>(false)

    const br = '\n';

  const handleOnContextMenuAction = (action: TableAction, table: Databases.Table) => {
    changeVisible(false);
    // const { onContextMenuAction } = this.props;
    onContextMenuAction && onContextMenuAction(action, table);
  };

  const changeVisible = (visible2?: boolean) => {
    setVisible(!!visible2 );
  };

  const getIconTable = (table: Databases.Table): JSX.Element => {
    // let classEngine = 'table';
    // if (table.engine.match(/Dictionary.*/)) return <BookOutlined />;
    // if (table.engine.match(/Distributed.*/)) return <CloudOutlined />;
    // if (table.engine.match(/AggregatingMergeTree.*/)) return <ForkOutlined />;
    // if (table.engine.match(/MaterializedView.*/)) return <EyeOutlined />;
    // if (table.engine.match(/SummingMergeTree.*/)) return <ReadOutlined />;
    // if (table.engine.match(/CollapsingMergeTree.*/)) return <GatewayOutlined />;
    // if (table.engine.match(/$Merge^/)) return <ShopOutlined />;
    // if (table.engine.match(/$TinyLog^/)) return <FireOutlined />;
    return <TableOutlined />;
  };



  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

    return (
      /*<Dropdown
        trigger={['contextMenu']}
        menu={{ items,onClick }}
        dropdownRender={(menus: DetailedReactHTMLElement<{style: React.CSSProperties}, HTMLElement>) => (
          <div style={contentStyle}>
            {React.cloneElement(menus, { style: menuStyle })}
            {/!*<Divider style={{ margin: 0 }} />
            <Space style={{ padding: 8 }}>
              <Button type="primary">Click me!</Button>
            </Space>*!/}
          </div>
        )}
      >
        {/!*<Flex alignItems="center" hfill className={css.root}>*!/}
        <div>
        {getIconTable(table)}
          <div>{table.name}|||333</div>
        </div>
        {/!*</Flex>*!/}
      </Dropdown>*/

      // ============= before

      // <Tooltip title={`${table.engine}${br}${table.size}`} placement="right">
        <Dropdown
          overlay={
            <ContextMenu table={table} onContextMenuAction={handleOnContextMenuAction} {...rest} />
          }
          trigger={['contextMenu']}
          open={visible}
          onOpenChange={changeVisible}
        >
         {/* <Flex alignItems="center" hfill className={css.root}>
            <TableOutlined />
           <div>{table.name}333</div>
         </Flex>*/}

          <div className={css.root} style={{display: 'flex'}}>
            <TableOutlined />
            <div>{table.name}333</div>
          </div>

          {/*<span>
            <TableOutlined />
          <div>{table.name}333</div>
          </span>*/}
        </Dropdown>
      // </Tooltip>

    )

}

export default TableTitle
