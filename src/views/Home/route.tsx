import { ReactNode } from 'react';
import { TabsPageSubType, TabsPageType } from '@/views/Home/model.ts';
import { ConsoleSqlOutlined, DatabaseOutlined } from '@ant-design/icons';
import Project from '@/views/Home/Project';
import DataSource from '@/views/Home/DataSource';


export const LeftSide: TabProp[] = [
  {
    key: 'project',
    icon: <ConsoleSqlOutlined />,
    label: '项目',
    children: <Project />
  },
  {
    key: 'database',
    icon: <DatabaseOutlined />,
    label: '数据库',
    children: <DataSource />,
  }
]



export type TabProp = {
  key: string;
  icon: ReactNode;
  label: string;
  children: ReactNode;
  isShow?: (type: TabsPageType, subType?: TabsPageSubType) => boolean;
  auth?: string;
};
