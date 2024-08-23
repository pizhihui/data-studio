// import React from 'react'
import { Button, Space, DatePicker, version } from 'antd';

const App = () => {
 return (
   <div style={{padding: '0 24px'}}>
     <h1>antd version: {version}</h1>
     <Space>
       <DatePicker/>
       <Button type="danger">请点击我</Button>
     </Space>
   </div>
 )
}

export default App
