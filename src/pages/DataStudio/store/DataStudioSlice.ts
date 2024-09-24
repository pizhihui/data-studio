import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type DataStudioType = {
  name: string,
  toolContentHeight: number
}

const initialState: DataStudioType = {
  name: '测试标题',
  toolContentHeight: 0
}

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
  }
})

export const {
  setNameReducerm,
  updateToolContentHeightReducer
} = DataStudioSlice.actions

export default DataStudioSlice.reducer
