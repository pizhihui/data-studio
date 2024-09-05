import React from 'react';
import JobTree from '@/views/Home/Project/JobTree';
import { Key } from '@ant-design/pro-components';


const Project: React.FC = () => {


  const onNodeClick = (info: any) => {
    console.log(info)
  }

  const handleRightClick = (info: any) => {
    console.log(info)
  }

  const onExpand = (expandedKeys: Key[]) => {
    console.log(expandedKeys)
  };


  const handleSelectKeyChange = (keys: Key[]) => {
    console.log(keys)
  }


  return (
      <JobTree onNodeClick={(info: any) => onNodeClick(info)}
               onRightClick={handleRightClick}
               selectKeyChange={(keys: Key[]) => handleSelectKeyChange}
               onExpand={onExpand}
       />
  )
}

export default Project
