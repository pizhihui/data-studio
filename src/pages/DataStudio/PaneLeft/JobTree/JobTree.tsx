import Search from 'antd/es/input/Search';
import { Button, Dropdown, Empty, Space, Tree, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { FileImageFilled } from '@ant-design/icons'
const { DirectoryTree } = Tree;
import { Key } from '@ant-design/pro-components';
import { ItemType } from 'rc-menu/es/interface';
import { TreeVo } from '@/pages/Home/model.ts';
import type { ButtonType } from 'antd/es/button/buttonHelpers';
import { CodeTwoTone, SortAscendingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store'
import { getListFileTrees } from '@/pages/DataStudio/PaneLeft/store/project.ts'
import { PythonSvg } from '@/components/Icons/CodeLanguageIcon.tsx'
import { ClickHouseIcons, SQLIcons } from '@/components/Icons/DBIcons.tsx'

/**
 * props
 */
type TreeProps = {
  onNodeClick: (info: any) => void;
  onRightClick: (info: any) => void;
  style?: React.CSSProperties;
  selectKeyChange: (keys: Key[]) => void;
  onExpand: (expandedKeys: Key[]) => void;
};

const TreeData = [
  {
    isLeaf: false,
    name: 'test1',
    parentId: 1,
    label: 'label1',
    icon: <CodeTwoTone />,
    title: 'test1',
    id: 1,
    key: 'key1',
    value: 'value1'
  }
]

export type JobTree = {
  name: string
  parentPath: string
  path: string
  properties: any
  children: JobTree[]
}


const JobTree: React.FC<TreeProps> = (props) => {

  const {
    projectData,
    // project: { data: projectData, expandKeys, selectKey },
    // catalogueSortType: { data: catalogueSortTypeData },
    selectCatalogueSortTypeData,
    onNodeClick,
    style,
    height,
    leftContainerWidth,
    onRightClick,
    selectKeyChange,
    onExpand,
    taskOwnerLockingStrategy,
    users
  } = props;

  const [searchValue, setSearchValueValue] = useState('');
  const [sortState, setSortState] = useState<{
    sortIconType: ButtonType;
    selectedSortValue: string[];
  }>({
    sortIconType: 'text' as ButtonType,
    selectedSortValue: []
  });
  const [data, setData] = useState<any[]>(
    TreeData
  );

  const { projects } = useAppSelector(state => state.projects)
  const dispatch = useAppDispatch()



  useEffect(() => {
    console.log('job tree use effect.......')
    dispatch(getListFileTrees({path: 'file:///data/linkis/users/hadoop'}))
  }, []);

  useEffect(() => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxx:', projects)
    setData(
      buildProjectTree(projects)
    );
  }, [projects, searchValue, taskOwnerLockingStrategy]);

  function buildProjectTree(tree: JobTree) {
    if (!tree ) {
      return []
    }
    const childrenTrees = tree.children?.map(item => {
      return {
        isLeaf: false,
        name: item.name,
        parentId: -1,
        label: item.name,
        icon: item.name.indexOf('.')!=-1?<Space size={'small'}><SQLIcons /></Space>:null,
        value: item.name,
        path: '',
        type: '',
        title: item.name,
        fullInfo: item,
        key: item.name,
        id: item.name,
        taskId: item.name,
        children: []
      }
    })
    return [{
      isLeaf: false,
      name: tree.name,
      parentId: -1,
      label: tree.name,
      value: tree.name,
      path: '',
      type: '',
      title: tree.name,
      fullInfo: tree,
      key: tree.name,
      id: tree.name,
      taskId: tree.name,
      children: childrenTrees
    }]
  }

  const onChangeSearch = (e: any) => {
    let { value } = e.target;
    console.log('search value: ', value)
    setSearchValueValue(value)
  }

  // function buildSortTreeOptions(trees: TreeVo[] = []): ItemType[] {
  //   return trees.map((tree) => {
  //     return {
  //       key: tree.value,
  //       label: tree.name,
  //       children: tree?.children && buildSortTreeOptions(tree.children)
  //     };
  //   });
  // }

  const onClick: MenuProps['onClick'] = (e) => {
    const selectSortValue = e.key;
    const sortField: string = selectSortValue.substring(0, selectSortValue.lastIndexOf('_'));
    const sortType: string = selectSortValue.substring(selectSortValue.lastIndexOf('_') + 1);
    if (
      sortField == selectCatalogueSortTypeData.sortValue &&
      sortType == selectCatalogueSortTypeData.sortType
    ) {
      setSortState((prevState) => ({
        ...prevState,
        selectedSortValue: []
      }));
      // dispatch
    } else {
      setSortState((prevState) => ({
        ...prevState,
        selectedSortValue: [selectSortValue]
      }));
      // dispatch
    }
  };

  return (
    <Space direction='vertical' size={0} >
      <Search
        style={{ margin: '8px 0px', width: leftContainerWidth - 60 }}
        placeholder='请输入关键字搜索'
        onChange={onChangeSearch}
        allowClear={true}
      />
      {/*<Dropdown
        menu={{
          items: buildSortTreeOptions(catalogueSortTypeData),
          mode: 'horizontal',
          selectable: true,
          onClick: onClick,
          selectedKeys: sortState.selectedSortValue
        }}
        placement='bottomLeft'
      >
        <Button icon={<SortAscendingOutlined />} type={sortState.sortIconType}></Button>
      </Dropdown>*/}
      <DirectoryTree
        style={{ ...style, overflowY: 'auto',height: '100vh' }}
        className={'treeList'}
        onSelect={(_, info) => onNodeClick(info)}
        onRightClick={onRightClick}
        // expandedKeys={expandKeys}
        expandAction={'doubleClick'}
        // selectedKeys={selectKey}
        onExpand={onExpand}
        treeData={data}
      />
    </Space>
  )
}

export default JobTree
