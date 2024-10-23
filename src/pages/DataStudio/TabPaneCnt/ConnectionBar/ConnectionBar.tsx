import React from 'react';
import { Space, Tag, Typography  } from 'antd'

import { DatabaseOutlined, YoutubeOutlined } from '@ant-design/icons'

const { Text, Link } = Typography;

const ConnectionBar = () => {
  return (
    <>
      <div className='connection-bar-wrapper'>
        <Space>
          <Text>数据源: </Text>
          <Tag icon={<DatabaseOutlined />} color="#55acee">
            Hologres
          </Tag>
        </Space>
      </div>

    </>
  );
};

export default ConnectionBar;
