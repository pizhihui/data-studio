import React from 'react'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IThunkState } from '@/store'
import { listFileTreesService } from '@/pages/DataStudio/services/DataStudioService.ts'
import { TabType } from '@/components/ListTab/interface.ts'
import { ColumnType } from 'rc-table'
import { ColumnInfoType } from '@/pages/DataStudio/model.ts'
import { generateRandomString } from '@/utils'


/**
 * 结果集 tab 类型
 */


export type QueryResTabType = {
  id: string,
  label: string,
  log: string,
  data: {
    columns: ColumnInfoType[],
    rows: RowType[]
  }
}

export type DataStudioType = {
  name: string
  toolContentHeight: number
  projects: Array<any>
  metaListTabs: TabType[]   // 元数据的 tab
  metaActiveTab: string      //
  queryResTabs: QueryResTabType[]
}

export type RowType = Record<string, any>

const initialState: DataStudioType = {
  name: '测试标题',
  toolContentHeight: 0,
  projects: [],
  metaListTabs: [],
  metaActiveTab: '',
  queryResTabs: []
}

export const getListFileTrees = createAsyncThunk<
  void,
  { path: string },
  { state: IThunkState }
>(
  'fetchdata',
  (path, {dispatch}) => {
    listFileTreesService('file:///data/linkis/users/hadoop').then(res => {
      // console.log('resuuuuuultttttt', res)
      dispatch(changeListFilesReducer(res.dirFileTrees))
    })
  }
)

const DataStudioSlice = createSlice({
  name: 'DataStudio',
  initialState,
  reducers: {
    setNameReducer: (state: DataStudioType, payload: PayloadAction<string>) => {
      state.name = state.name + '|添加的后缀|' + payload
    },
    updateToolContentHeightReducer: (state: DataStudioType, payload: PayloadAction<number>) => {
      state.toolContentHeight = payload.payload
    },
    changeListFilesReducer(state: DataStudioType, {payload}) {
      state.projects = payload
    },

    // 元数据 tab 操作
    addMetaTabAction: (state: DataStudioType, action: PayloadAction<TabType>) => {
      state.metaListTabs.push(action.payload);  // 增加新 tab
      state.metaActiveTab = action.payload.id
    },
    removeMetaTabAction: (state: DataStudioType, action: PayloadAction<string>) => {
      console.log('action.payload', action.payload)
      const res = state.metaListTabs.filter(tab => tab.id !== action.payload)
      console.log('resxxxxx', res)
      state.metaListTabs = res
    },
    updateMetaTabsActiveKey: (state: DataStudioType, action: PayloadAction<string>) => {
      state.metaActiveTab = action.payload
    },
    // 结果集 tab 数据
    addTabResData: (state: DataStudioType,
                    action: PayloadAction<{
                      columns: ColumnInfoType[],  // 列名
                      rows: RowType[]                // 每一行的数据
                    }>) => {
      const tab: QueryResTabType = {
        id: Date.now() + '',
        label: '测试结果集' + generateRandomString(5),
        log: '这是生成的查询日志....',
        data: action.payload
      }
      state.queryResTabs.push(tab)
    }
  }
})

export const {
  setNameReducer,
  updateToolContentHeightReducer,
  changeListFilesReducer,
  // 元数据 tab 操作
  addMetaTabAction,
  removeMetaTabAction,
  updateMetaTabsActiveKey,
  // 结果集操作
  addTabResData
} = DataStudioSlice.actions

export default DataStudioSlice.reducer
