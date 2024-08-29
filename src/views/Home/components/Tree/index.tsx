import Tree from "react-virtualized-tree";
import VirtualizedTree, { FlattenedNode } from 'react-virtualized-tree';

import classNames from 'classnames';



import {Nodes} from './simpleTree.ts'
import React, {useEffect} from "react";
import {Flex} from "reflexy";


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


const TreeContainer: React.FC = () => {

  // const [nodes, setNodes] = React.useState<any>(null);
  //
  useEffect(() => {
    console.log('xxxxxxxxxxx', Nodes)
    // setNodes({nodes: Nodes});
  }, []);

  const handleChange = nodes => {
    console.log('handleChange', Nodes);
  };

  return (
      <VirtualizedTree nodes={Nodes} onChange={handleChange}>
        {({style, node, ...rest}) => (
          <div style={style}>
              {node.name}123
          </div>
         /* <Flex row justifyContent="center">
          {node.name}123
          </Flex>*/
        )}
      </VirtualizedTree>
  )
}

export default TreeContainer

