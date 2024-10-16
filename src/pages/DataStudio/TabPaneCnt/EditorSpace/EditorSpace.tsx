import React from 'react';
import { SplitPane } from '@andrewray/react-multi-split-pane'
import { Flex, Splitter, Typography } from 'antd';
import DatabaseTree from '@/pages/DataStudio/DatabaseTree'
import BottomPane from '@/pages/DataStudio/BottomPane'
import CodeEditor from '@/pages/DataStudio/CodeEditor'
import { ActionType } from '@/pages/DataStudio/CodeEditor/Toolbar'
import { useAppDispatch } from '@/store'
import { addTabResData, RowType } from '@/pages/DataStudio/store/DataStudioSlice.ts'
import { ColumnInfoType } from '@/pages/DataStudio/model.ts'
import { getQueryDataResultService } from '@/pages/DataStudio/services/DataStudioService.ts'
import { Allotment } from 'allotment'

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{height: '100%'}}>
    <Typography.Title type="secondary" level={5} style={{whiteSpace: 'nowrap'}}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const EditorSpace = () => {

  const dispatch = useAppDispatch()

  async function queryData() {

    const res = await getQueryDataResultService('_0.dolphin')
    console.log('dataxxxx', res)

    const columns: ColumnInfoType[] = res.metadata.map((m: any): ColumnInfoType => {
      return {
        name: m.columnName,
        comment: m.comment,
        type: m.dataType,
      }
    })

    const rows: RowType[] = res.fileContent.map((c: any): RowType => {
      const row: RowType = columns.reduce((acc: RowType, currentValue: ColumnInfoType, index: number) => {
        acc[currentValue.name] = c[index]
        return acc
      }, {})
      return row
    })

    console.log('dataxxxx============', columns, rows)
    // const columns: ColumnInfoType[] = []
    // const rows: RowType[] = []
    dispatch(addTabResData({columns, rows}))
  }

  function onEditorAction(actionType: ActionType) {
    switch (actionType) {
      case ActionType.RunCurrent:
      case ActionType.RunAll:
        queryData()
    }
  }

  return (
    <>
      <div style={{
        // height: parent.innerHeight,
        // overflow: 'auto',
        height: 'calc(100vh - 40px - 31px - 33px)',
        // height: '100vh',
        width: '100%',
        // position: 'relative'
      }}>
        <Allotment defaultSizes={[150, 800]}>

          <Allotment.Pane minSize={100} maxSize={400}>
            <DatabaseTree/>
          </Allotment.Pane>

          <Allotment.Pane>
            <Allotment vertical={true}>

              {/* sql编辑区域 */}
              <Allotment.Pane minSize={100}>
                <CodeEditor onAction={onEditorAction}/>
              </Allotment.Pane>

              {/* 下方区域: 元数据展示,查询结果展示 */}
              <Allotment.Pane minSize={100}>
                <BottomPane/>
              </Allotment.Pane>

            </Allotment>
          </Allotment.Pane>
        </Allotment>
      </div>
    </>
  );
};

export default EditorSpace;
