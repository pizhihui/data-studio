import React, { useEffect } from 'react';
import { useAppSelector } from '@/store'
import { TableSheet } from '@/components/TableSheet'
import { S2DataConfig } from '@antv/s2'

const DataResult = () => {

  const queryResTabs = useAppSelector((state) => state.dataStudio.queryResTabs)

  return (
    <div>
      <TableSheet data={queryResTabs} />
    </div>
  );
};

export default DataResult;
