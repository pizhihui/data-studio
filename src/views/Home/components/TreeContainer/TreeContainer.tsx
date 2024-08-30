import React from 'react';
import  VirtualizedTree from './VirtualizedTree'
import SearchInput from './SearchInput'
import { Flex } from 'antd';
import { COLLAPSED_CHILDREN } from '@/views/Home/components/TreeContainer/VirtualizedTree/treeData.ts';


import { Nodes } from './VirtualizedTree/treeData.ts'


import css2 from './TreeContainer.module.css'
import classNames from 'classnames';

const TreeContainer: React.FC = () => {


  const highlightedId = 12344

  const updateTreeNodes = () => {
    console.log('updateTreeNodes')
  }

  const collapseAll = () => {
    console.log('collapseAll')
  }

  const load = () => {
    console.log('load...........')
  }

  const actions = []

  console.log('css2', css2)
  console.log('xxxxname........', classNames(css2.txtcontainer))

  return (
    <Flex vertical style={{width: '100%', height: '100%'}}>
      <SearchInput />
      <div className={css2.txtcontainer}>
        23333333
      </div>
      <VirtualizedTree
        highlightedId={highlightedId}
        nodes={Nodes}
        onChange={updateTreeNodes}
        onCollapse={collapseAll}
        onReload={load}
        {...actions}
      />
    </Flex>
  )
}

export default TreeContainer
