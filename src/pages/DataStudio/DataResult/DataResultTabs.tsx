import React from 'react';
import { Tabs } from 'antd'
import { FileTextOutlined, HomeOutlined, SettingOutlined, TableOutlined, UserOutlined } from '@ant-design/icons'
import VerticalTabs from '@/components/VerticalTabs'
import { TableSheet } from '@/components/TableSheet'
import { useAppSelector } from '@/store'


type PropsType = {
  label: string
}

const DataResultTabs: React.FC<PropsType> = (props) => {
  const {
    label
  } = props

  const queryResTabs = useAppSelector((state) => state.dataStudio.queryResTabs)

  const tabs = [
    {
      key: 'log',
      label: 'log',
      icon: <FileTextOutlined />,
      content: <div>Profile Content</div>,
    },
    {
      key: 'table',
      label: 'table',
      icon: <TableOutlined />,
      content: <TableSheet data={queryResTabs} />,
    },
  ];

  return (
    <div style={{ height: '100%' }}>
        <VerticalTabs tabs={tabs} />
    </div>
  );
};

export default DataResultTabs;
