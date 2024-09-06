import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { listFileTrees } from '@/views/Home/Project/service/project.ts';
import { createAppSlice } from '@/store/createAppSlice.ts';


export const getListFileTrees = createAsyncThunk(
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
