import React, { useEffect, useState } from 'react';
import { SheetComponent as S2Table } from '@antv/s2-react'

import { S2DataConfig, S2Options, ThemeCfg } from '@antv/s2'
import { Card, Flex, Space } from 'antd'

import '@antv/s2/dist/style.min.css'

const ColumnInfo: React.FC = (props) => {

  const {
    tableInfo
  } = props

  const TooltipContent = (props) => <div>
    <Card size={'small'} style={{fontSize: '12px'}}>
      <Space direction='vertical'>
        <span>列名:&nbsp;   {props.cell.meta.valueField}</span>
        <span>当前值:&nbsp; {props.cell.actualText}</span>
      </Space>
    </Card>
  </div>

  // ----------------------------------- Options
  const s2Options = {
    width: 500,
    height: 300,
    // 序列号列
    seriesNumber: {
      enable: true,
      text: '序列号'
    },
    // 自定义样式
    style: {
      dataCell: {
        height: 20
      },
      colCell: {
        height: 22
      }
    },
    // 交互样式
    interaction: {
      enableCopy: true,
      resize: {
        rowCellVertical: false, // 是否开启行头垂直方向 resize 热区
        cornerCellHorizontal: false, // 是否开启角头水平方向 resize 热区
        colCellHorizontal: false,  // 是否开启列头水平方向 resize 热区
        colCellVertical: false,    // 是否开启列头垂直方向 resize 热区 （列头隐藏时该配置无效）
        visible: (cell) => false,  // 自定义当前单元格是否显示 resize 热区
        disable: (resizeInfo) => true,  // 用于控制行高 resize 是否生效。
      },
    },
    tooltip: {
      enable: true,
      style: {
        fontSize: '12px',
      },
      className: 'column-info-container',
      operation: {
        hiddenColumns: false
      },
      /*content: (cell, defaultTooltipShowOptions) => {
        console.log('当前单元格：', cell)
        console.log('默认 tooltip 详细信息：', defaultTooltipShowOptions)
        return <TooltipContent cell={ cell } />
      },*/
      colCell: {
        content() { return ''}
      },
      dataCell: {
        content(cell) {
          return <TooltipContent cell={ cell } />
        }
      }
    }
  } as S2Options;

  const themeCfg: ThemeCfg = {
    name: 'gray'
    // theme: DarkTheme,
    // palette: newPalette,
  };


  const [s2DataConfig, setData] = useState(null as S2DataConfig | null);

  useEffect(() => {
    console.log('tableinfoooooooo',tableInfo.nativeColumns)
    console.log('tableinfoooooooo--------',tableInfo.partitionColumns)
    const allDatas = [...tableInfo.nativeColumns, ...tableInfo.partitionColumns]
    console.log('allDatasallDatasallDatas', allDatas)
    const tableData = {
      // data:  [
      //   { name: "col1",type: "string", comment: "笔111"},
      //   { name: "col2",type: "string",comment: "笔222"},
      // ],
      data: allDatas,
      fields: {
        // rows: ['province', 'city'],
        columns: ['name', 'type','comment'],
        // values: ['price'],
      }
    }
    setData(tableData)
  }, [])

  return (
    <div className='column-info-container'>
      <Flex flex={1} style={{height: 300}}>
        <S2Table
          // onContextMenu={onContextMenu}
          // onDataCellDoubleClick={onDataCellDoubleClick}
          // getSpreadSheet={getSpreadSheet}
          // adaptive={{ width: true, height: false }}
          sheetType='table'
          dataCfg={s2DataConfig}
          options={s2Options}
          themeCfg={themeCfg}
          // loading={loading}
        />
      </Flex>
    </div>
  );
};

export default ColumnInfo;
