import React, { useEffect, useState } from 'react';
import { SheetComponent, SheetComponentProps } from '@antv/s2-react';
import {
  S2DataConfig,
  S2Event,
  SortParams,
  SpreadSheet,
  copyToClipboard,
  asyncGetAllPlainData,
  download
} from '@antv/s2'
import '@antv/s2-react/dist/style.min.css';

import { s2DataConfig } from '@/components/TableSheet/data.ts'
import { QueryResTabType } from '@/pages/DataStudio/store/DataStudioSlice.ts'
import TableHeader from '@/components/TableSheet/TableHeader.tsx'
import { Button } from 'antd'
import { getCurrentTime, getFormatFullDateTimeStr } from '@/utils'

import './TableSheet.css'

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

  const [sortParams, setSortParams] = React.useState<SortParams>([]);

  useEffect(() => {
    console.log('重新设置数据 xxxxx')
    setSheetType('table')

    // if (Math.random() >= 0.5) {
    //   console.log('重新设置数据xxxxx  table ')
    //   setSheetType('table')
    // } else {
    //   console.log('重新设置数据xxxxx  pivot ')
    //   setSheetType('pivot')
    // }
    const data2 = data[0]?.data
    if (!data2) return
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

  async function exportCsv() {
    const data = await asyncGetAllPlainData({
      sheetInstance: s2Ref.current!,
      split: ',',
      formatOptions: true,
      // formatOptions: {
      //   formatHeader: true,
      //   formatData: true
      // },

      // 同步导出
      async: false
    });
    // 导出数据 (csv)
    const filename = getFormatFullDateTimeStr()
    download(data, filename) // filename.csv
  }

  const header: SheetComponentProps['header'] = {
    title: '',
    description: '',
    // 导出
    export: {open: false},
    // 行列切换
    switcher: {open: false},
    // 高级排序
    // advancedSort: {
    //   open: true,
    //   sortParams,
    //   onSortConfirm: (ruleValues, sortParams) => {
    //     sets2DataConfig({...s2DataConfig, sortParams});
    //     setSortParams(sortParams);
    //   }
    // },
    extra: (
      <Button size={'small'} style={{verticalAlign: 'top'}} onClick={exportCsv}>
        导出CSV
      </Button>
    )
  };

  if (!data || data.length <= 0) return <span>暂时无数据</span>

  return (
    s2DataConfig && <div>

      {/* s2 table */}
      {/*<TableHeader />*/}
      <div className='tablesheet-wrapper'>
        <SheetComponent
          ref={s2Ref}
          dataCfg={s2DataConfig}
          options={s2Options}
          sheetType={sheetType}
          adaptive={true}
          onMounted={onMounted}
          header={header}
        />
      </div>

    </div>
  );
};

export default TableSheet;
