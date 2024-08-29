
import React from 'react';
import {Dropdown, Tree} from 'antd';
import type { GetProps, TreeDataNode } from 'antd';
import { Menu } from 'antd';

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

const menu = (
  <Menu
    items={[
      {
        key: 'add',
        label: <span>新增</span>,
      },
      {
        key: 'delete',
        label: <span>删除</span>,
      },
      {
        key: 'update',
        label: <span>编辑</span>,
      },
    ]}
  />
);


const TreeAntd: React.FC = () => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  const titleRender = (nodeData: DataNode) => {
    return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div>{nodeData.title}</div>
      </Dropdown>
    );
  };


  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      titleRender={titleRender}
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default TreeAntd;
