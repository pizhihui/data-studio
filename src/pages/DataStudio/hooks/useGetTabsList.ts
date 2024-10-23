import { useAppSelector } from '@/store'

export function useGetTabsList() {

  const dataStudio = useAppSelector((state) => state.dataStudio)

  const {metaListTabs, resultListTabs} = dataStudio

  return {
    metaListTabs,
    resultListTabs
  }
}
