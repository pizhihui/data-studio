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
      <Flex style={{height: parent.innerHeight, overflow: 'auto', position: 'relative'}}>
        {/*<SplitPane
          split={'vertical'}
          defaultSizes={[10, 20]}
          minSize={120}
          className={'split-pane'}
        >*/}
        <Allotment defaultSizes={[200, 800]}>
          <Allotment.Pane minSize={90} maxSize={300}>
            <DatabaseTree/>
          </Allotment.Pane>
          <Allotment.Pane>
            {/*<SplitPane
              split={'horizontal'}
              defaultSizes={[100, 500]}
              minSize={200}
              className={'split-pane'}
            >*/}
            <Allotment vertical={true}>
              {/* sql编辑区域 */}
              <Allotment.Pane minSize={200}>
                <CodeEditor onAction={onEditorAction}/>
              </Allotment.Pane>
              {/* 下方区域: 元数据展示,查询结果展示 */}
              <Allotment.Pane minSize={200}>
                <BottomPane/>
              </Allotment.Pane>
            </Allotment>
            {/*<Splitter layout="vertical" style={{ height: 'calc(100vh - 100px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Splitter.Panel defaultSize='50%' min='10%' max='70%'>
                <Desc text="First" />
              </Splitter.Panel>
              <Splitter.Panel defaultSize='50%' min='10%' max='70%'>
                <Desc text="Second" />
              </Splitter.Panel>
            </Splitter>*/}
          </Allotment.Pane>
        </Allotment>
      </Flex>
    </>
  );
};

export default EditorSpace;
