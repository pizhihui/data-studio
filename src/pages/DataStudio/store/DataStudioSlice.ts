import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IThunkState } from '@/store'
import { listFileTreesService } from '@/pages/DataStudio/services/DataStudioService.ts'


export type DataStudioType = {
  name: string,
  toolContentHeight: number,
  projects: Array<any>
}

const initialState: DataStudioType = {
  name: '测试标题',
  toolContentHeight: 0,
  projects: []
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
    setNameReducer: (state: DataStudioType, payload: PayloadAction<String>) => {
      state.name  = state.name + '|添加的后缀|' + payload
    },
    updateToolContentHeightReducer: (state: DataStudioType, payload: PayloadAction<number>) => {
      state.toolContentHeight  = payload.payload
    },
    changeListFilesReducer(state, {payload}) {
      state.projects = payload
    }
  }
})

export const {
  setNameReducerm,
  updateToolContentHeightReducer,
  changeListFilesReducer
} = DataStudioSlice.actions

export default DataStudioSlice.reducer
