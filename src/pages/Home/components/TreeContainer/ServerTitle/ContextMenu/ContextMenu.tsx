import { Menu } from 'antd';
import { useCallback } from 'react';
import { MenuInfo } from 'rc-menu/lib/interface';
import {Databases} from "@/services";


export enum ServerAction {
  OpenProcesses = 1,
  OpenMetrics,
  OpenDbOverview,
  OpenServerOverview,
  OpenSqlHistory,
}

export const ContextMenuProps = {};

export interface ContextMenuProps {
  server: Databases.Server;
  onContextMenuAction?: (action: ServerAction, server: Databases.Server) => void;
}

export default function ContextMenu({ onContextMenuAction, server }: ContextMenuProps) {

  const onClick = useCallback(({ key, domEvent }: MenuInfo) => {
    domEvent.preventDefault();
    domEvent.stopPropagation();
    // @ts-ignore
    onContextMenuAction && ServerAction[key] && onContextMenuAction(+key as ServerAction, server);
  }, []);

  return (
    <Menu selectable={false} onClick={onClick}>
      <Menu.Item key={ServerAction.OpenProcesses}>Processes</Menu.Item>
      <Menu.Item key={ServerAction.OpenDbOverview}>Db Overview</Menu.Item>
      <Menu.Item key={ServerAction.OpenServerOverview}>Server Overview</Menu.Item>
      <Menu.Item key={ServerAction.OpenMetrics}>Metrics server</Menu.Item>
      <Menu.Item key={ServerAction.OpenSqlHistory}>History sql</Menu.Item>
    </Menu>
  )

}
