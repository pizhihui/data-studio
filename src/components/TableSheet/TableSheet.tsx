import React, { useEffect, useState } from 'react';
import { SheetComponent } from '@antv/s2-react';
import { S2DataConfig, S2Event, SpreadSheet } from '@antv/s2'
import '@antv/s2-react/dist/style.min.css';

import { s2DataConfig } from '@/components/TableSheet/data.ts'
import { QueryResTabType } from '@/pages/DataStudio/store/DataStudioSlice.ts'

const s2Options = {
  width: 600,
  height: 480
}

type PropsType = {
  data?: QueryResTabType[]
}

type sheetType = 'pivot' | 'table' | 'chart' | 'gridAnalysis' | 'strategy' | 'editable'


const TableSheet: React.FC<PropsType> = (props) => {

  const {
    data = []
  } = props

  const s2Ref = React.useRef<SpreadSheet>()
  const [sheetType, setSheetType] = useState<sheetType>('table')
  const [s2DataConfig, sets2DataConfig] = React.useState<S2DataConfig>()

  useEffect(() => {
    console.log('重新设置数据 xxxxx')
    if (Math.random() >= 0.5) {
      console.log('重新设置数据xxxxx  table ', )
      setSheetType('table')
    } else {
      console.log('重新设置数据xxxxx  pivot ', )
      setSheetType('pivot')
    }
    const data2 = data[0]?.data
    if(!data2) return
    sets2DataConfig({
      data: data2.rows,
      fields: {
        columns: data2.columns.map((o) => o.name)
      }
    })
    // s2Ref.current?.render(true)
    // s2Ref.current?.on(S2Event.GLOBAL_CONTEXT_MENU, (event) => {
    //   console.log('EVENTX', event);
    // });
  }, [data]);

  const onMounted = () => {
    console.log('tabletablexxxx onMounted', s2Ref.current)
  }

  if (!data || data.length <= 0) return <span>暂时无数据</span>

  return (
    s2DataConfig && <div>
      {/* s2 table */}
      <SheetComponent
        ref={s2Ref}
        dataCfg={s2DataConfig}
        options={s2Options}
        sheetType={sheetType}
        adaptive={true}
        onMounted={onMounted}
      />
    </div>
  );
};

export default TableSheet;
