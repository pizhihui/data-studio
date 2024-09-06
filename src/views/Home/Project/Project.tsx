import React, { useEffect } from 'react';
import JobTree from '@/views/Home/Project/JobTree';
import { Key } from '@ant-design/pro-components';
import { useAppDispatch } from '@/store';
import { getListFileTrees } from '@/views/Home/Project/store/project.ts';


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
  const dispatch = useAppDispatch()

  useEffect(() =>{
    console.log('project effect aaaaaa')
    dispatch(getListFileTrees('file:///data/linkis/users/hadoop'))
  }, [])


  return (
      <JobTree onNodeClick={(info: any) => onNodeClick(info)}
               onRightClick={handleRightClick}
               selectKeyChange={(keys: Key[]) => handleSelectKeyChange}
               onExpand={onExpand}
       />
  )
}

export default Project
