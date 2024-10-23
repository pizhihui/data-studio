import React from 'react';
import ConnectionBar from '@/pages/DataStudio/TabPaneCnt/ConnectionBar'
import EditorSpace from '@/pages/DataStudio/TabPaneCnt/EditorSpace'

const TabPaneCnt = () => {
  return (
    <>
      {/* 当前的bar */}
      <ConnectionBar />

      {/* 编辑器页面 */}
      <EditorSpace />
    </>
  );
};

export default TabPaneCnt;
