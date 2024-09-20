import React from 'react';
import { Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';

import { Databases } from '@/services';

export enum TableAction {
  OpenTable = 1,
  CodeSelectFrom,
  InsertTableName,
  MakeSQLDescribe,
  MakeSQLDropTable,
}

export const ContextMenuProps = {};

export interface ContextMenuProps {
  table: Databases.Table;
  onContextMenuAction?: (action: TableAction, table: Databases.Table) => void;
}

export default class ContextMenu extends React.Component<ContextMenuProps> {
  private onItemClick = ({ key, domEvent }: MenuInfo) => {
    domEvent.preventDefault();
    domEvent.stopPropagation();
    const { onContextMenuAction, table } = this.props;
    // @ts-ignore
    onContextMenuAction && TableAction[key] && onContextMenuAction(+key as TableAction, table);
  };

  render() {
    return (
      <Menu selectable={false} onClick={this.onItemClick}>
        <Menu.Item key={TableAction.OpenTable}>Open table abc</Menu.Item>
        <Menu.Item key={TableAction.CodeSelectFrom}>Make SELECT</Menu.Item>
        <Menu.Item key={TableAction.InsertTableName}>Insert table name</Menu.Item>
        <Menu.Item key={TableAction.MakeSQLDescribe}>Make SQL Describe</Menu.Item>
        {/*<Menu.Item key={TableAction.MakeSQLDropTable}>Make SQL Drop Table</Menu.Item>*/}
      </Menu>
    );
  }
}
