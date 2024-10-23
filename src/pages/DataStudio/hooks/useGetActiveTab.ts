import { useAppSelector } from '@/store'


export function useGetActiveTab() {
  const {dataStudio} = useAppSelector(state => state)

  const { metaResultActiveTab, metaActiveTab,resultActiveTab, resultLogTableActiveTab } = dataStudio

  return {
    metaActiveTab,
    metaResultActiveTab,
    resultActiveTab,
    resultLogTableActiveTab
  }
}

