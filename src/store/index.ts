import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './modules/Counter'
import LeftContainerReducer from '@/store/modules/LeftContainer.ts';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    leftContainer: LeftContainerReducer
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


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const shallowEqualApp = shallowEqual

