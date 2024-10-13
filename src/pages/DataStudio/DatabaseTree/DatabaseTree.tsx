import React, { useCallback, useEffect, useState } from 'react';
import { Input, Space, Spin, Tree, TreeDataNode } from 'antd'
import { CarryOutOutlined, FormOutlined, ReloadOutlined, CheckOutlined } from '@ant-design/icons'
import SchemaTree from '@/components/DataSource/SchemaTree'
import { useAppDispatch, useAppSelector } from '@/store'
import { getDbsTreeService, getTablesTreeService } from '@/pages/DataStudio/services/DataStudioService.ts'
import type { DataNode, Key } from 'rc-tree/lib/interface';
import { buildSchemaTree } from '@/pages/DataStudio/functions.tsx'
import { CircleBtn } from '@/components/CallBackButton/CircleBtn.tsx'
import {addMetaTabAction} from '@/pages/DataStudio/store/DataStudioSlice.ts'

const { DirectoryTree } = Tree

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined/>,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined/>,
        children: [
          {title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined/>},
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined/>
          },
          {title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined/>}
        ]
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined/>,
        children: [{title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined/>}]
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined/>,
        children: [
          {title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined/>},
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined/>,
            switcherIcon: <FormOutlined/>
          }
        ]
      }
    ]
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined/>,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined/>,
        children: [
          {title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined/>},
          {title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined/>}
        ]
      }
    ]
  }
];


const DatabaseTree = (props: any) => {

  // const {
  //   toolContentHeight,
  //   database: { dbData, selectDatabaseId, expandKeys, selectKeys }
  // } = props;

  const [isLoadingDatabase, setIsLoadingDatabase] = useState(true);

  const [showLine, setShowLine] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showLeafIcon, setShowLeafIcon] = useState<React.ReactNode>(true);
  const dispatch = useAppDispatch()

  const [treeDataServer, setTreeDataServer] = useState([])

  const {toolContentHeight} = useAppSelector(state => state.dataStudio)

  const {
    style,
  } = props;

  useEffect(() => {
    console.log('toolContentHeight', toolContentHeight)
    getDbsTreeService().then(res => {
      const dbs = []
      res.dbs.map(item => (dbs.push({name: item.dbName})))
      console.log('获取到数据', res.dbs, dbs)
      setTreeDataServer(dbs)
      setIsLoadingDatabase(false)
    })
  }, [toolContentHeight]);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const handleLeafIconChange = (value: 'true' | 'false' | 'custom') => {
    if (value === 'custom') {
      return setShowLeafIcon(<CheckOutlined/>);
    }

    if (value === 'true') {
      return setShowLeafIcon(true);
    }

    return setShowLeafIcon(false);
  };

  const addNewTab = (tablename: string) => {
    const newTab = {
      id: Date.now() + '', // 使用当前时间戳作为 id
      label: tablename,
      // content: `This is the content of New Tab ${tabsData.length + 1}`,
      // contentComponent: TabContentComponent // 设置内容组件
    };
    dispatch(addMetaTabAction(newTab)); // 使用 Redux action 添加新 tab
    // setActiveTab(newTab.id); // 设置新 tab 为激活状态
  };

  const handleTreeNodeClick = async (keys: Key[], info: any) => {
    console.log('clickkkkkkkkk', keys, info)
    // // 选中的key
    // dispatch({
    //   type: STUDIO_MODEL.updateDatabaseSelectKey,
    //   payload: keys
    // });

    const {
      node: {isLeaf, parentId: schemaName, name: tableName, fullInfo}
    } = info;

    if (!isLeaf) {
      return;
    }
    addNewTab(tableName)
    // const queryParams = { id: selectDatabaseId, schemaName, tableName };
    // dispatch({
    //   type: STUDIO_MODEL.addTab,
    //   payload: {
    //     icon: selectDb.type,
    //     id: selectDatabaseId + schemaName + tableName,
    //     breadcrumbLabel: [selectDb.type, selectDb.name].join('/'),
    //     label: schemaName + '.' + tableName,
    //     params: { queryParams: queryParams, tableInfo: fullInfo },
    //     type: TabsPageType.metadata
    //   }
    // });
  };

  const handleTreeExpand = (expandedKeys: Key[]) => {
    console.log('expand tree', expandedKeys)
    // dispatch({
    //   type: STUDIO_MODEL.updateDatabaseExpandKey,
    //   payload: expandedKeys
    // });
  };

  function handleRefreshData() {
    setIsLoadingDatabase(true)
    getDbsTreeService().then(res => {
      const dbs = []
      res.dbs.map(item => (dbs.push({name: item.dbName})))
      console.log('获取到数据', res.dbs, dbs)
      setTreeDataServer(dbs)
      setIsLoadingDatabase(false)
    })
  }

  // It's just a simple demo. You can use tree map to optimize update perf.
  const updateTreeData = async (list: DataNode[], key: React.Key): any => {

    const data = await getTablesTreeService()
    console.log('tables datasssssss', data)

    const tableList = data.tables.map((node) => {
      // if (node.key === key) {
      //   return {
      //     ...node,
      //     children,
      //   };
      // }
      // if (node.children) {
      //   return {
      //     ...node,
      //     children: updateTreeData(node.children, key, children),
      //   };
      // }
      // return node;
      return {
        name: node.tableName
      }
    })
    console.log('tableListtableListtableList', tableList)
    return tableList
  };


  const onLoadData = async (treeNode) => {
    const data = await getTablesTreeService()
    const tableList = data.tables.map((node) => {
      return {
        name: node.tableName
      }
    })
    console.log('load data....', treeNode, data, tableList)
    return new Promise((resolve) => {
      const { name } = treeNode;
      // 动态加载子节点
      const newData = treeDataServer.map((node) => {
        if (node.name === name) {
          return {
            ...node,
            tables: tableList,
          };
        }
        return node;
      });
      console.log('xxxxx', newData)
      setTreeDataServer(newData);
      resolve()
    })
  };

  const [searchValue, setSearchValue] = useState('');
  const onSearchChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setSearchValue(e.target.value);
    },
    [searchValue]
  );

  const newTreeData = buildSchemaTree(treeDataServer, '')
  // console.log('schematreeeeeeee', newTreeData)

  const item = {
    title: '测试表',
    icon: <ReloadOutlined/>,
    onClick: () => {
      handleRefreshData()
    }
  }

  return (
    <>
      <Spin spinning={isLoadingDatabase} delay={0}>
        {/*<Tree
          showLine={showLine ? { showLeafIcon } : false}
          showIcon={showIcon}
          defaultExpandedKeys={['0-0-0']}
          onSelect={onSelect}
          treeData={treeData}
        />*/}
        {/* <SchemaTree
          style={{ overflowY: 'auto',height: '100vh' }}
          // selectKeys={selectKeys}
          // expandKeys={expandKeys}
          // height={toolContentHeight - 64 - 30}
          loadData={onLoadData}
          height={500}
          onNodeClick={handleTreeNodeClick}
          treeData={treeDataServer}
          onExpand={handleTreeExpand}
          refreshData={handleRefreshData}
        />*/}

        <div className={'container-header'}>
          <div>数据库列表</div>
          <Space size={1}>
            <CircleBtn
              title={item.title}
              icon={item.icon}
              onClick={() => {
                console.log('clickkkkkkk')
                item.onClick?.()
              }}
              key={item.title}
            />
          </Space>
        </div>

        <Input
          placeholder="search...."
          allowClear
          style={{marginBottom: 8}}
          value={searchValue}
          onChange={onSearchChange}
        />

        <DirectoryTree
          style={{overflowY: 'auto', height: '100vh'}}
          // height={height}
          // expandedKeys={expandKeys}
          // selectedKeys={selectKeys}
          // onExpand={onExpand}
          onSelect={handleTreeNodeClick}
          loadData={onLoadData}
          treeData={newTreeData}
        />


      </Spin>


    </>
  );
};

export default DatabaseTree;
