import React from 'react'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IThunkState } from '@/store'
import { listFileTreesService } from '@/pages/DataStudio/services/DataStudioService.ts'
import {TabType} from '@/components/ListTab/interface.ts'


export type DataStudioType = {
  name: string,
  toolContentHeight: number,
  projects: Array<any>,
  metaListTabs:  TabType[];   // 元数据的 tab
  metaActiveTab: string      //
}

const initialState: DataStudioType = {
  name: '测试标题',
  toolContentHeight: 0,
  projects: [],
  metaListTabs: [],
  metaActiveTab: ''
}

export const getListFileTrees = createAsyncThunk<
  void,
  {path: string},
  {state: IThunkState}
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
      state.name  = state.name + '|添加的后缀|' + payload
    },
    updateToolContentHeightReducer: (state: DataStudioType, payload: PayloadAction<number>) => {
      state.toolContentHeight  = payload.payload
    },
    changeListFilesReducer(state:DataStudioType, {payload}) {
      state.projects = payload
    },

    // 元数据 tab 操作
    addMetaTabAction: (state: DataStudioType, action: PayloadAction<TabType>) => {
      state.metaListTabs.push(action.payload);  // 增加新 tab
      state.metaActiveTab = action.payload.id
    },
    removeMetaTabAction: (state:DataStudioType, action: PayloadAction<string>) => {
      console.log('action.payload', action.payload)
      const res = state.metaListTabs.filter(tab => tab.id !== action.payload)
      console.log('resxxxxx', res)
      state.metaListTabs = res
    },
    updateMetaTabsActiveKey: (state: DataStudioType, action: PayloadAction<string>) => {
      state.metaActiveTab = action.payload
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
  updateMetaTabsActiveKey
} = DataStudioSlice.actions

export default DataStudioSlice.reducer
