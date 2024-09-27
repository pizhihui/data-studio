
import type { DataNode, Key } from 'rc-tree/lib/interface'
import { Empty, Flex, Input, Space, Tree } from 'antd'
import React, { useCallback, useState } from 'react'
import { buildSchemaTree } from '@/pages/DataStudio/functions.tsx'
import { ReloadOutlined } from '@ant-design/icons'
import { CircleBtn } from '@/components/CallBackButton/CircleBtn.tsx'

const { DirectoryTree } = Tree
/**
 * props
 */
type SchemaTreeProps = {
  treeData: Partial<any>[];
  onNodeClick: (keys:Key[], info: any) => void;
  height: number; // Calculate the height of the virtual scrolling container, required, otherwise it may cause page lag
  expandKeys:Key[];
  onExpand: (keys: Key[]) => void;
  selectKeys: Key[];
  refreshData: () => any;
  loadData: (any) => any;
};

const SchemaTree: React.FC<SchemaTreeProps> = (props) => {
  const {
    treeData,
    onNodeClick,
    height,
    expandKeys,
    onExpand,
    selectKeys,
    refreshData,
    loadData
  } = props;

  const [searchValue, setSearchValue] = useState('');

  /**
   * search tree node
   * @type {(e: {target: {value: React.SetStateAction<string>}}) => void}
   */
  const onSearchChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setSearchValue(e.target.value);
    },
    [searchValue]
  );

  const item = {
    title: '测试表',
    icon: <ReloadOutlined/>,
    onClick: () => {
      refreshData()
    }
  }

  /**
   * render
   */
  const newTreeData = buildSchemaTree(treeData, searchValue)
  // console.log('schematreeeeeeee', newTreeData)
  return (
    <>
      {treeData.length > 0 ? (
        <>
          <div className={'container-header'}>
            <div>数据库列表</div>
            <Space size={1}>
              <CircleBtn
                title={item.title}
                icon={item.icon}
                onClick={() => {
                  console.log('clickkkkkkk')
                  item.onClick?.()
                }}
                key={item.title}
              />
            </Space>
          </div>
          <Input
            placeholder="search...."
            allowClear
            style={{marginBottom: 8}}
            value={searchValue}
            onChange={onSearchChange}
          />
          <DirectoryTree
            style={{overflowY: 'auto', height: '100vh'}}
            height={height}
            expandedKeys={expandKeys}
            selectedKeys={selectKeys}
            onExpand={onExpand}
            onSelect={onNodeClick}
            loadData={loadData}
            treeData={newTreeData}
          />
        </>
      ) : (
        <Empty className={'code-content-empty'}/>
      )}
    </>
  );
};

export default SchemaTree;
