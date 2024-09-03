import React, { useCallback } from 'react';
import { RendererProps, selectors } from 'react-virtualized-tree-fix';
import { Flex } from 'reflexy';
import { TypedNode } from '@/store/Tree/TreeStore';
import css from './VirtualizedTree.css';
import classNames from 'classnames';
import ServerTitle, {ServerTitleProps, ServerContextMenuProps} from '../ServerTitle/';
import SpecialTitle from '../SpecialTitle';

import { Databases } from '@/services';
import TableTitle, {TableContextMenuProps} from "../TableTitle";
import {CommandRowProps} from "../CommandRowTitle";
import ActionTitle, { ColumnTitleProps } from '../ColumnTitle';
import DbTitle from "@/views/Home/components/TreeContainer/DbTitle";



// import './VirtualizedTree.css';

export interface NodeActions {
  onCommandAction?: CommandRowProps['onAction'];
  onColumnAction?: ColumnTitleProps['onAction'];
  onServerAction?: ServerContextMenuProps['onContextMenuAction'];
  onTableAction?: TableContextMenuProps['onContextMenuAction'];
}

export interface TreeActions extends Pick<ServerTitleProps, 'onReload' | 'onCollapse'> {}

type NodeRendererProps = RendererProps<any> & { node: TypedNode };

type RenderNodeProps = NodeRendererProps & NodeActions & TreeActions;

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

  // has children
  const { hasChildren, isExpanded } = selectors.getNodeRenderOptions(node);
  console.log('node: hasChildren: ', node.name, hasChildren)
  return (
    <Flex
      wrap={false}
      alignItems="center"
      onClick={toggle}
      onDoubleClick={toggle}
      style={{ paddingLeft: `calc(${node.deepness} * 1em)` }}
    >
      <i
        className={classNames(
          css.expandable,
          hasChildren && !isExpanded && css.collapsed,
          hasChildren && isExpanded && css.loading
        )}
        onClick={toggle}
      />
      {children}
    </Flex>
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

  console.log('rendernode......', node)

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

  if (Databases.isDatabase(node)) {
    const number: number = node.children!.length
    return <DbTitle name={node.name} tableCount={number} />;
  }

  if (Databases.isTable(node)) {
    return <TableTitle table={node} onContextMenuAction={onTableAction} />;
  }

  // if (Databases.isSpecialItem(node)) {
  //   return <CommandRowTitle command={node} onAction={onCommandAction} />;
  // }

  // if (Databases.isSpecialGroupItem(node)) {
  //   return <SpecialTitle type={node.type} name={node.name} />;
  // }

  if (Databases.isColumn(node)) {
    return <ActionTitle column={node} onAction={onColumnAction} />;
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
