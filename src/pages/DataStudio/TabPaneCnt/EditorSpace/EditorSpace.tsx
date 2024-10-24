import React, { useRef } from 'react';
import { SplitPane } from '@andrewray/react-multi-split-pane'
import { Flex, Splitter, Typography } from 'antd';
import DatabaseTree from '@/pages/DataStudio/DatabaseTree'
import BottomPane from '@/pages/DataStudio/BottomPane'
import CodeEditor from '@/pages/DataStudio/CodeEditor'
import { ActionType } from '@/pages/DataStudio/CodeEditor/Toolbar'
import { useAppDispatch } from '@/store'
import {
  addMetaTabAction, addResultTabAction,
  addTabResData,
  RowType,
  updateMetaResultTabsActiveKey
} from '@/pages/DataStudio/store/DataStudioSlice.ts'
import { ColumnInfoType } from '@/pages/DataStudio/model.ts'
import { getQueryDataResultService } from '@/pages/DataStudio/services/DataStudioService.ts'
import { Allotment } from 'allotment'
import { BottomTabType } from '@/pages/DataStudio/BottomPane/BottomPane.tsx'
import { getCurrentTime } from '@/utils'
import { useSize } from 'ahooks'

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{height: '100%'}}>
    <Typography.Title type="secondary" level={5} style={{whiteSpace: 'nowrap'}}>
      {props.text}
    </Typography.Title>
  </Flex>
);

const EditorSpace = () => {


  const paneRef = useRef(null!);
  const domSize= useSize(paneRef);

  const dispatch = useAppDispatch()

  const addNewTab = (tablename: string) => {
    const newTab = {
      id: Date.now() + '', // 使用当前时间戳作为 id
      label: tablename,
    };
    dispatch(addResultTabAction(newTab)); // 使用 Redux action 添加新 tab
  };

  async function queryData() {
    // 添加 tab
    addNewTab(getCurrentTime())

    // 切换 tab
    dispatch(updateMetaResultTabsActiveKey(BottomTabType.RESULT))

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
              <Allotment.Pane minSize={100} ref={paneRef}>
                <BottomPane height={domSize?.height}/>
              </Allotment.Pane>

            </Allotment>
          </Allotment.Pane>
        </Allotment>
      </div>
    </>
  );
};

export default EditorSpace;
