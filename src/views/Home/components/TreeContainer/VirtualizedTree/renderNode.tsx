import React, { useCallback } from 'react';
import { RendererProps, selectors } from 'react-virtualized-tree';
import { TypedNode } from '@/store/Tree/TreeStore.ts';
import css from './VirtualizedTree.module.css';
import classNames from 'classnames';
import ServerTitle from '@/views/Home/components/TreeContainer/ServerTitle/ServerTitle.tsx';
import SpecialTitle from '@/views/Home/components/TreeContainer/SpecialTitle';

import { Databases } from '@/services';


// import './VirtualizedTree.module.css';

// export interface NodeActions {
//   onCommandAction?: CommandRowProps['onAction'];
//   onColumnAction?: ColumnTitleProps['onAction'];
//   onServerAction?: ServerContextMenuProps['onContextMenuAction'];
//   onTableAction?: TableContextMenuProps['onContextMenuAction'];
// }

// export interface TreeActions extends Pick<ServerTitleProps, 'onReload' | 'onCollapse'> {}

type NodeRendererProps = RendererProps<any> & { node: TypedNode };

// type RenderNodeProps = NodeRendererProps & NodeActions & TreeActions;
type RenderNodeProps = NodeRendererProps;

type Renderer = (props: RenderNodeProps) => JSX.Element | null;


function SelectableRenderer({ node: { state }, children }: RenderNodeProps) {

  const selected: boolean = !!state && state.selected;
  const highlighted: boolean = !!state && state.highlighted;

  return (
    <span  className={classNames(
      css.selectable,

      selected && css.selected,
      highlighted && css.highlighted
    )}>

      {children}
    </span>
  )
}


function ExpandableRenderer({ node, onChange, children }: RenderNodeProps) {

  const toggle = useCallback(() => {
    const isExpanded = node.state && node.state.expanded;
    onChange(selectors.updateNode(node, { expanded: !isExpanded }));
  }, [])

  const { hasChildren, isExpanded } = selectors.getNodeRenderOptions(node);

  return (
    <span onClick={toggle}>
      <i className={classNames(
        css.expandable,
        hasChildren && !isExpanded && css.collapsed,
        hasChildren && isExpanded && css.expanded
      )}/>
      {children}
    </span>
  )
}

function NodeRenderer({
                        node,
                        onReload,
                        onCollapse,
                        onServerAction,
                        onTableAction,
                        onColumnAction,
                        onCommandAction,
                      }: RenderNodeProps) {

  console.log('nodexxxxx', node)

  if (Databases.isServer(node)) {
    return (
      <ServerTitle
        title={node.name}
        server={node}
        onReload={onReload}
        onCollapse={onCollapse}
        onContextMenuAction={onServerAction}
      />
    );
  }
  return <SpecialTitle type="Null:SpecialTitle" name="Null:SpecialTitle" />;
}

export default function renderNode (
  renderers: Renderer[],
  props: RenderNodeProps
): React.ReactElement<any> {
  const [nextRenderer, ...restRenderers] = renderers
  const children = restRenderers.length === 0 ? [] : renderNode(restRenderers, props);
  return React.createElement(nextRenderer, props, children)
}

export const defaultRenderers: Renderer[] = [ExpandableRenderer, NodeRenderer];
