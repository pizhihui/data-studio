import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Container = {
  selectKey: string;
  selectSubKey: { [c: string]: string };
  height: number | string;
  width: number | string;
  maxWidth?: number | string;
};


const initialState: Container = {
  selectKey: 'project',
  selectSubKey: {},
  height: '100%',
  width: 260
}

const LeftContainer = createSlice({
  name: 'LeftContainer',
  initialState,
  reducers: {
    updateSelectRightKey(state, {payload}: PayloadAction<string>) {
      state.selectKey = payload
    }
  }
})

export const {
  updateSelectRightKey
} = LeftContainer.actions
export default LeftContainer.reducer

