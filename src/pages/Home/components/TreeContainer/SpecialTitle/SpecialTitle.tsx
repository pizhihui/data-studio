import React from 'react';
// import { Flex } from 'reflexy';
import './SpecialTitle.less';
import { MessageOutlined, ControlOutlined } from '@ant-design/icons';

interface Props {
  name: string;
  type: string;
}

export default function SpecialTitle({ name, type }: Props) {
  let icon = <MessageOutlined />;
  if (type === 'server.overview') icon = <ControlOutlined />;

  return (
    // <Flex alignItems="center" hfill className={css.root}>
    <div style={{display: 'flex', alignItems: 'center', height: '100%'}} className={'root-left'}>
      {icon}
      <div>{name}</div>
      {/*<Flex grow justifyContent="flex-end" />*/}
      <div style={{display: 'flex', justifyContent: 'flex-end'}}></div>
    </div>
  );
}
