

import { Dropdown } from 'antd';
import { MenuInfo } from 'rc-menu/es/interface';
import React from 'react';
import { MenuItemType } from 'antd/es/menu/interface'
import type { MenuProps } from 'antd';

type RightContextMenuProps = {
  onClick: (values: MenuInfo) => void;
  items: MenuProps['items'];
  contextMenuPosition: any;
  open: boolean;
  openChange: () => void;
};

const RightContextMenu: React.FC<RightContextMenuProps> = (props) => {
  const { onClick, items, openChange, open, contextMenuPosition } = props;

  return (
    <Dropdown
      arrow
      autoAdjustOverflow
      destroyPopupOnHide
      trigger={['contextMenu']}
      overlayStyle={{ ...contextMenuPosition }}
      menu={{ onClick: onClick, items: items }}
      open={open}
      onOpenChange={openChange}
    >
      {/*占位*/}
      <div style={{ ...contextMenuPosition }} />
    </Dropdown>
  );
};

export default RightContextMenu;
