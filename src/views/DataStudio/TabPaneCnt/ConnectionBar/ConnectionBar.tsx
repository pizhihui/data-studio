import React from 'react';
import { Space, Tag, Typography  } from 'antd'

import { ConnectionBarWrapper } from './styles.ts'
import { DatabaseOutlined, YoutubeOutlined } from '@ant-design/icons'

const { Text, Link } = Typography;

const ConnectionBar = () => {
  return (
    <>
      <ConnectionBarWrapper>
        <Space>
          <Text>数据源: </Text>
          <Tag icon={<DatabaseOutlined />} color="#55acee">
            Hologres
          </Tag>
        </Space>
      </ConnectionBarWrapper>

    </>
  );
};

export default ConnectionBar;
