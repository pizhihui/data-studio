import { Dropdown } from 'antd';
import React, { useCallback, useState } from 'react';
import ContextMenu, { ContextMenuProps } from './ContextMenu';
import css from './ServerTitle.module.css'
import { SwitcherOutlined, ReloadOutlined, DatabaseOutlined } from '@ant-design/icons';

export interface ServerTitleProps extends ContextMenuProps {
  title: string;
  onReload?: () => void;
  onCollapse?: (server: ServerTitleProps['server']) => void;
}


export default function ServerTitle({
                                      title,
                                      onReload,
                                      onCollapse,
                                      server,
                                      onContextMenuAction,
                                    }: ServerTitleProps){

  const [visible, setVisible] = useState<boolean | undefined>(false);


  const onAction = useCallback<NonNullable<ContextMenuProps['onContextMenuAction']>>(
    (action, srv) => {
      setVisible(false);
      onContextMenuAction && onContextMenuAction(action, srv);
    },
    [onContextMenuAction]
  );
  const collapse = useCallback(() => onCollapse && onCollapse(server), [onCollapse, server]);
  const preventPropagation = useCallback(
    (event: React.SyntheticEvent<any>) => event.stopPropagation(),
    []
  );

  return (
    <div>
      <Dropdown overlay={<ContextMenu server={server} onContextMenuAction={onAction} />}
                trigger={['contextMenu']}
                visible={visible}
                onVisibleChange={setVisible}>
        <span className={css.dropdown}>
          <DatabaseOutlined />
          <div className={css.title}>{title}</div>
        </span>
      </Dropdown>
      <span>
        <ReloadOutlined title="Reload" onClick={onReload} className={css.action} />
        <SwitcherOutlined title="Collapse" onClick={collapse} className={css.action} />
      </span>
    </div>
  )

}





