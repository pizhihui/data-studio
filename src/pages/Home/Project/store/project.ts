import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { listFileTrees } from '@/pages/Home/Project/service/project.ts';
import { createAppSlice } from '@/store/createAppSlice.ts';
import { RootState } from '@/store'

interface IThunkState {
  state: RootState
}

export const getListFileTrees = createAsyncThunk<
  void ,
  {path: string},
  IThunkState
>(
  'fetchdata',
  (path, {dispatch}) => {
    console.log('请求接口 xxxx, path::::::', path)
    listFileTrees('file:///data/linkis/users/hadoop').then(res => {
      console.log('resuuuuuult', res)
      dispatch(changeListFiles(res.dirFileTrees))
    })
  }
)


const initialState = {
  projects: []
}


const project = createAppSlice({
  name: 'project',
  initialState,
  reducers: {
    changeListFiles(state, {payload}) {
      state.projects = payload
    }
  }
})

export const {
  changeListFiles
}  = project.actions

export default project.reducer
