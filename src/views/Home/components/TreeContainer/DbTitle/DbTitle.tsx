import React from 'react';
import { DatabaseOutlined } from '@ant-design/icons';
// import { Flex } from 'reflexy';
import css from './DbTitle.module.css';

interface Props {
  name: string;
  tableCount: number;
}

export default function DbTitle({ name, tableCount }: Props) {
  return (
    // <Flex alignItems="center" hfill className={css.root}>
    <div className={css.root} style={{
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      marginRight: '0.3em'
    }}>
      <DatabaseOutlined />
      <div>{name}</div>
      {/*<Flex grow justifyContent="flex-end" style={{ fontSize: '80%' }}>*/}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '80%'
      }}>
        {tableCount}
      </div>
    </div>
  );
}
