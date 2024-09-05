import React from 'react';
import  VirtualizedTree from './VirtualizedTree/VirtualizedTree.tsx'
import SearchInput from './SearchInput'
import { Flex } from 'antd';


import { Nodes } from './VirtualizedTree/treeData'
import { Nodes2 } from './VirtualizedTree/treeData2'


import classNames from 'classnames';
import { JSX } from 'react/jsx-runtime';
import { TreeProps } from './VirtualizedTree/VirtualizedTree';

const TreeContainer: React.FC = () => {

  const highlightedId = 124

  const updateTreeNodes = () => {
    console.log('updateTreeNodes')
  }

  const collapseAll = () => {
    console.log('collapseAll')
  }

  const load = () => {
    console.log('load...........')
  }

  const actions: never[] | (JSX.IntrinsicAttributes & TreeProps) = []

  return (
    <Flex vertical style={{width: '100%', height: '100%'}}>
      <SearchInput/>
      <VirtualizedTree
        highlightedId={highlightedId}
        nodes={Nodes2}
        onChange={updateTreeNodes}
        onCollapse={collapseAll}
        onReload={load}
        {...actions}
      />

    </Flex>
  )
}

export default TreeContainer
