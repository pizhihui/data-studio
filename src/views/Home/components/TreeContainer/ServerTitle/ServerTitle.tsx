import { Dropdown } from 'antd';
import React, { useCallback, useState } from 'react';
import ContextMenu, { ContextMenuProps } from './ContextMenu';
// import css from './ServerTitle.less'
import {SwitcherOutlined, ReloadOutlined, DatabaseOutlined, CloudServerOutlined} from '@ant-design/icons';
// import { Flex } from 'reflexy';

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
    // <Flex alignItems="center" hfill>
    <div style={{display: 'flex',alignItems: 'center', height: '100%'}}>
      {/*<Dropdown overlay={<ContextMenu server={server} onContextMenuAction={onAction} />}
                trigger={['contextMenu']}
                visible={visible}
                onVisibleChange={setVisible}>
        <Flex grow alignItems="center" className={css.dropdown}>
          <DatabaseOutlined />
          <CloudServerOutlined />
          <div className={css.title}>{title}</div>
        </Flex>
      </Dropdown>*/}
      {/*<Flex justifyContent="flex-end" onDoubleClick={preventPropagation}>*/}
      <div style={{display: 'flex', justifyContent: 'flex-end'}} onDoubleClick={preventPropagation}>
        <ReloadOutlined title="Reload" onClick={onReload} className={'action'} />
        <SwitcherOutlined title="Collapse" onClick={collapse} className={'action'} />
      </div>
    </div>
  )

}





