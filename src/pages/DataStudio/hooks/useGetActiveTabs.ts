import { useAppSelector } from '@/store'


export function useGetActiveTabs() {
  const {dataStudio} = useAppSelector(state => state)

  const { metaResultActiveTab, metaActiveTab } = dataStudio

  return {
    metaActiveTab,
    metaResultActiveTab
  }
}

