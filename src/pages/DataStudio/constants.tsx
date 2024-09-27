import { MenuItemType } from 'antd/es/menu/interface'
import type { MenuProps } from 'antd';

import {
  CompassTwoTone,
  CopyrightTwoTone,
  CopyTwoTone,
  DeleteTwoTone,
  DownCircleTwoTone,
  EditTwoTone,
  PlusCircleTwoTone,
  UpCircleTwoTone
} from '@ant-design/icons';
/**
 * 作业级别:
 * 非目录(即任务)
 *    导出 json
 *    修改
 *    复制
 *    剪切
 *    删除
 * @type {({icon: JSX.Element, label: string, key: string} | {icon: JSX.Element, label: string, key: string} | {icon: JSX.Element, label: string, key: string} | {icon: JSX.Element, label: string, key: string})[]}
 */
export const JOB_RIGHT_MENU = (disabled = false): MenuProps['items'] => [
  {
    key: 'edit',
    icon: <EditTwoTone />,
    label: '编辑'
  },
  {
    key: 'copy',
    icon: <CopyTwoTone />,
    label: '复制'
  },
  {
    key: 'cut',
    icon: <CopyrightTwoTone />,
    label: '剪切',
    disabled: disabled
  },
  {
    key: 'delete',
    icon: <DeleteTwoTone twoToneColor={'red'} />,
    label: '删除'
  },
  {
    key: 'exportJson',
    icon: <UpCircleTwoTone />,
    label: '导出JSON'
  }
];


/**
 * 目录级别:
 *   新建子目录
 *   新建作业
 *   删除(删除时检测是否有下级)
 *   重命名
 *   粘贴
 *   取消

 * @type {({icon: JSX.Element, label: string, key: string} | {icon: JSX.Element, label: string, key: string} | {icon: JSX.Element, label: string, key: string} | {icon: JSX.Element, label: string, key: string})[]}
 */
export const FOLDER_RIGHT_MENU = (disabled = false): MenuProps['items'] => [
  {
    key: 'addSubFolder',
    icon: <PlusCircleTwoTone />,
    label: '创建子目录'
  },
  {
    key: 'createTask',
    icon: <PlusCircleTwoTone />,
    label: '创建任务'
  },
  {
    key: 'delete',
    icon: <DeleteTwoTone twoToneColor={'red'} />,
    label: '删除'
  },
  {
    key: 'renameFolder',
    icon: <EditTwoTone />,
    label: '重命名'
  },
  {
    key: 'paste',
    icon: <CompassTwoTone />,
    label: '粘贴',
    disabled: !disabled
  },
  {
    key: 'importJson',
    icon: <DownCircleTwoTone />,
    label: '到处 JSON'
  },
  {
    key: 'exportJson',
    icon: <UpCircleTwoTone />,
    label: '到处 JSON'
  }
];
