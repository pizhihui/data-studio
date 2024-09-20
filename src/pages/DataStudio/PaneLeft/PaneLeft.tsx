import React, { useEffect, useState } from 'react';
import JobTree from './JobTree'
import { Key } from '@ant-design/pro-components'
import { useAppDispatch } from '@/store'
import { getListFileTrees } from './store/project.ts'
import { MenuItemType } from 'antd/es/menu/interface'
import { MenuInfo } from 'rc-menu/es/interface';
import RightContextMenu from '@/components/RightContextMenu'
import { FOLDER_RIGHT_MENU, JOB_RIGHT_MENU } from '@/pages/DataStudio/PaneLeft/constants.tsx'

import type { MenuProps } from 'antd';

export type ContextMenuPosition = {
  left: number;
  top: number;
  position: string;
  cursor: string;
  width: number | string;
  zIndex: number;
};

export interface ProjectState {
  rightActiveKey: string;
  cutId: number | undefined;
  contextMenuPosition: ContextMenuPosition;
  contextMenuOpen: boolean;
  menuItems: MenuProps['items'];
  selectedKeys: any[],
  isLeaf: boolean;
  rightClickedNode?: any;
  isCreateSub: boolean;
  isEdit: boolean;
  isRename: boolean;
  isCreateTask: boolean;
  isCut: boolean;
  value: any;
}

export const InitContextMenuPosition: ContextMenuPosition = {
  left: 0,
  top: 0,
  position: 'fixed',
  cursor: 'pointer',
  width: '12vw',
  zIndex: 1000
};

export const InitProjectState: ProjectState = {
  rightActiveKey: '',
  cutId: 0,
  contextMenuPosition: InitContextMenuPosition,
  contextMenuOpen: false,
  menuItems: [],
  selectedKeys: [],
  isLeaf: false,
  rightClickedNode: {},
  isCreateSub: false,
  isEdit: false,
  isRename: false,
  isCreateTask: false,
  isCut: false,
  value: {}
};

const PaneLeft = () => {

  const [projectState, setProjectState] = useState<ProjectState>(InitProjectState);


  const onNodeClick = (info: any) => {
    console.log(info)
  }

  const handleRightClick = (info: any) => {
    console.log('right click........',info)
    const {
      node: { isLeaf, key, fullInfo },
      node,
      event
    } = info;

    // 判断右键的位置是否超出屏幕 , 如果超出屏幕则设置为屏幕的最大值 往上偏移 200px (需要根据具体的右键菜单数量合理设置)
    if (event.clientY + 150 > window.innerHeight) {
      event.clientY = window.innerHeight - 200;
    }

    // 设置右键菜单
    const setPrevState = (prevState) => ({
      ...prevState,
      isLeaf: isLeaf,
      menuItems: isLeaf
        ? JOB_RIGHT_MENU(prevState.isCut && prevState.cutId !== undefined)
        : FOLDER_RIGHT_MENU(prevState.isCut && prevState.cutId !== undefined),
      contextMenuOpen: true,
      contextMenuPosition: {
        ...prevState.contextMenuPosition,
        top: event.clientY + 5,
        left: event.clientX + 10,
        screenX: event.screenX,
        screenY: event.screenY
      },
      selectedKeys: [key],
      rightClickedNode: { ...node, ...fullInfo },
      value: fullInfo
    })
    setProjectState(setPrevState);
    // 设置选中的值
    // dispatch({ type: STUDIO_MODEL.updateProjectSelectKey, payload: [key] });
  }

  const onExpand = (expandedKeys: Key[]) => {
    console.log(expandedKeys)
  };


  const handleSelectKeyChange = (keys: Key[]) => {
    console.log(keys)
  }
  const dispatch = useAppDispatch()

  useEffect(() =>{
    console.log('project effect aaaaaa')

  }, [])


  /**
   *  all context menu click handle
   */
  const handleMenuClick: MenuProps['onClick'] = async (node) => {
    console.log('menu click....', node)
    setProjectState((prevState) => ({ ...prevState, rightActiveKey: node.key }));
    switch (node.key) {
      case 'addSubFolder':
        console.log('add usb folder')
        break;
      case 'createTask':
        console.log('add usb folder')
        break;
      case 'delete':
        console.log('add usb folder')
        break;
      case 'renameFolder':
        console.log('add usb folder')
        break;
      case 'edit':
        console.log('add usb folder')
        break;
      case 'exportJson':
        console.log('add usb folder')
        break;
      case 'importJson':
        console.log('add usb folder')
        break;
      case 'copy':
        console.log('add usb folder')
        break;
      case 'cut':
        console.log('add usb folder')
        break;
      case 'paste':
        console.log('add usb folder')
        break;
      default:
        handleContextCancel()
        break;
    }
  };

  const handleContextCancel = () => {
    setProjectState((prevState) => ({
      ...prevState,
      contextMenuOpen: false
    }));
  };

  return (
   <>
     <JobTree onNodeClick={(info: any) => onNodeClick(info)}
              onRightClick={handleRightClick}
              selectKeyChange={(keys: Key[]) => handleSelectKeyChange}
              onExpand={onExpand}
     />
     <RightContextMenu
       contextMenuPosition={projectState.contextMenuPosition}
       open={projectState.contextMenuOpen}
       openChange={() =>
         setProjectState((prevState) => ({ ...prevState, contextMenuOpen: false }))
       }
       items={projectState.menuItems}
       onClick={handleMenuClick}
     />
   </>

  );
};

export default PaneLeft;
