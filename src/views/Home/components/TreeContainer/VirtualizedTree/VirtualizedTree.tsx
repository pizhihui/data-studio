import Tree , { FlattenedNode } from 'react-virtualized-tree-fix';
import classNames from 'classnames';
import { Flex } from 'reflexy';
import React, {useEffect} from "react";
import { isNodesEquivalent } from '@babel/types';
import renderNode, {defaultRenderers, NodeActions, TreeActions} from './renderNode';

import css from './VirtualizedTree.css'
import {TypedNode} from "@/store/Tree/TreeStore";

export interface TreeProps extends NodeActions, TreeActions {
  nodes: TypedNode[];
  onChange: any;
  highlightedId?: TypedNode['id'];
}


function VirtualizedTree({ nodes, onChange, highlightedId, onCollapse, ...actions  }: TreeProps) {

  console.log('tree......', css)

  return (
    /*<Tree nodes={Nodes} onChange={handleChange}>
      {({style, node, ...rest}) => (
        <div style={style}>
          {node.name}123
        </div>
      )}
    </Tree>*/
    <Flex grow className={css.root}>
      <Tree
        nodeMarginLeft={0}
        nodes={nodes}
        onChange={onChange as any}
        scrollToId={highlightedId as any}
      >
        {({ node, ...rest }) =>
          renderNode(defaultRenderers, {
            node: node as FlattenedNode & TypedNode,
            onCollapse,
            ...rest,
            ...actions,
          })
        }
      </Tree>
    </Flex>
  )
}

export default VirtualizedTree

