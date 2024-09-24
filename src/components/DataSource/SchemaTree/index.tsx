/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import { Key } from '@ant-design/pro-components';
import { Empty, Flex, Input, Space, Tree } from 'antd';
import React, { useCallback, useState } from 'react';
import { buildSchemaTree } from '@/components/DataSource/SchemaTree/functions.tsx'
import { ReloadOutlined } from '@ant-design/icons'
import { CircleBtn } from '@/components/CallBackButton/CircleBtn.tsx'

const { DirectoryTree } = Tree;
/**
 * props
 */
type SchemaTreeProps = {
  treeData: Partial<any>[];
  onNodeClick: (keys: Key[], info: any) => void;
  height: number; // Calculate the height of the virtual scrolling container, required, otherwise it may cause page lag
  expandKeys: Key[];
  onExpand: (keys: Key[]) => void;
  selectKeys: Key[];
  refreshData: () => any;
};

const SchemaTree: React.FC<SchemaTreeProps> = (props) => {
  const { treeData, onNodeClick, height, expandKeys, onExpand, selectKeys, refreshData } = props;

  const [searchValue, setSearchValue] = useState('');

  /**
   * search tree node
   * @type {(e: {target: {value: React.SetStateAction<string>}}) => void}
   */
  const onSearchChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setSearchValue(e.target.value);
    },
    [searchValue]
  );

  const item = {
    title: '测试表',
    icon: <ReloadOutlined />,
    onClick: () => {
      refreshData()
    }
  }

  /**
   * render
   */
  return (
    <>
      {treeData.length > 0 ? (
        <>
          <Flex >
            <Space>
              <div>
                数据库列表
              </div>
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
          </Flex>
          <Input
            placeholder='search....'
            allowClear
            style={{ marginBottom: 8 }}
            value={searchValue}
            onChange={onSearchChange}
          />
          <DirectoryTree
            style={{  overflowY: 'auto',height: '100vh' }}
            height={height}
            expandedKeys={expandKeys}
            selectedKeys={selectKeys}
            onExpand={onExpand}
            onSelect={onNodeClick}
            treeData={buildSchemaTree(treeData, searchValue)}
          />
        </>
      ) : (
        <Empty className={'code-content-empty'} />
      )}
    </>
  );
};

export default SchemaTree;
