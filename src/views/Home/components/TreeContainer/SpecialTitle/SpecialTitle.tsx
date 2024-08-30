import React from 'react';
import css from './SpecialTitle.css';
import { MessageOutlined, ControlOutlined } from '@ant-design/icons';

interface Props {
  name: string;
  type: string;
}

export default function SpecialTitle({ name, type }: Props) {
  let icon = <MessageOutlined />;
  if (type === 'server.overview') icon = <ControlOutlined />;

  return (
    <span>
      {icon}
      <div>{name}</div>
      <span />
    </span>
  );
}
