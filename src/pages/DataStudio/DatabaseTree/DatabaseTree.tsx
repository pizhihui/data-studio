import React, { useEffect, useState } from 'react';
import { Spin, Tree } from 'antd'
import { CarryOutOutlined, FormOutlined } from '@ant-design/icons'
import SchemaTree from '@/components/DataSource/SchemaTree'
import { useAppDispatch, useAppSelector } from '@/store'
import { getDatabasesListService } from '@/pages/DataStudio/services/DataStudioService.ts'

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
    getDatabasesListService().then(res => {
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

  const handleTreeNodeClick = async (keys: Key[], info: any) => {
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
    // dispatch({
    //   type: STUDIO_MODEL.updateDatabaseExpandKey,
    //   payload: expandedKeys
    // });
  };

  function handleRefreshData() {
    setIsLoadingDatabase(true)
    getDatabasesListService().then(res => {
      const dbs = []
      res.dbs.map(item => (dbs.push({name: item.dbName})))
      console.log('获取到数据', res.dbs, dbs)
      setTreeDataServer(dbs)
      setIsLoadingDatabase(false)
    })
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
        <SchemaTree
          style={{ overflowY: 'auto',height: '100vh' }}
          // selectKeys={selectKeys}
          // expandKeys={expandKeys}
          // height={toolContentHeight - 64 - 30}
          height={500}
          onNodeClick={handleTreeNodeClick}
          treeData={treeDataServer}
          onExpand={handleTreeExpand}
          refreshData={handleRefreshData}
        />

      </Spin>


    </>
  );
};

export default DatabaseTree;
