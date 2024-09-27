import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { configureStore, ThunkAction, Action, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import counterReducer from './modules/Counter'
import LeftContainerReducer from '@/store/modules/LeftContainer.ts';
import DataStudioReducer from '@/pages/DataStudio/store/DataStudioSlice.ts'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    leftContainer: LeftContainerReducer,
    dataStudio: DataStudioReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export interface IThunkState {
  state: RootState
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const shallowEqualApp = shallowEqual

// ======================
// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
