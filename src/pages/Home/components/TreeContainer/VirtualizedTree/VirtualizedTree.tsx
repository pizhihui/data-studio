import Tree , { FlattenedNode } from 'react-virtualized-tree-fix';
import classNames from 'classnames';


import {Nodes} from './treeData.ts'
import React, {useEffect} from "react";
import { isNodesEquivalent } from '@babel/types';
import renderNode, { defaultRenderers } from './renderNode.tsx';

import css from './VirtualizedTree.module.css'

const Deepness = ({node, children}) => {
  const deepness = node.deepness + 1;
  const className = classNames({
    [`mi mi-filter-${deepness}`]: deepness <= 9,
    'filter-9-plus': deepness > 9,
  });

  return (
    <span>
      <i />
    {children}
    </span>
  );
};


type TypedNode = Node & { children?: TypedNode[] };


// class TreeContainer extends React.Component {
//
//   componentDidMount() {
//     console.log('Component mounted', Nodes);
//   }
//
//   render() {
//     return (
//       <VirtualizedTree nodes={Nodes}>
//         {({style, node, ...rest}) => (
//           <div style={style}>
//             {node.name}
//           </div>
//         )}
//       </VirtualizedTree>
//     );
//   }
// }

// export interface TreeProps extends NodeActions, TreeActions {
//   nodes: TypedNode[];
//   onChange: any;
//   highlightedId?: TypedNode['id'];
// }

export interface TreeProps {
  nodes: TypedNode[];
  onChange: any;
  highlightedId?: TypedNode['id'];
}


function VirtualizedTree({ nodes, onChange, highlightedId, onCollapse, ...actions  }: TreeProps) {

  return (
    /*<Tree nodes={Nodes} onChange={handleChange}>
      {({style, node, ...rest}) => (
        <div style={style}>
          {node.name}123
        </div>
      )}
    </Tree>*/
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
       /* <div>
          {node.name}
        </div>*/
      }
    </Tree>
  )
}

export default VirtualizedTree

