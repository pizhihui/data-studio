import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { listFileTrees } from '@/pages/Home/Project/service/project.ts';
import { createAppSlice } from '@/store/createAppSlice.ts';
import { IThunkState, RootState } from '@/store'



export const getListFileTrees = createAsyncThunk<
  void,
  {path: string},
  {state: IThunkState}
>(
  'fetchdata',
  (path, {dispatch}) => {
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
