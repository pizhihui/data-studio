import React, { useRef, useState } from 'react';
import { Tabs } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import TabPaneCnt from '@/pages/DataStudio/TabPaneCnt'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  // return { label: `Tab ${id}`, children: `Content of Tab Pane ${index + 1}`, key: id };
  return {
    key: id,
    label: `Sql ${id}`,
    icon: <ConsoleSqlOutlined/>,
    children: <TabPaneCnt />,
  };
});

const PaneRight = () => {

  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [items, setItems] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setItems([...items, { label: 'New Tab', children: 'New Tab Pane', key: newActiveKey }]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setItems(newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  const alignValue = 'center'

  return (
    <>
      <Tabs
        rootClassName={'data-studio-tabs'}
        hideAdd
        defaultActiveKey="1"
        type="editable-card"
        size="small"
        onChange={onChange}
        onEdit={onEdit}
        activeKey={activeKey}
        items={items}
        tabBarGutter={0}
        animated={false}
        indicator={{ size: (origin) => origin - 20, align: alignValue }}
      />
    </>
  );
};

export default PaneRight;
