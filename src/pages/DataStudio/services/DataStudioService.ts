import HYRequest from '@/services/requests/request'
import ajax, { ResDataType } from '@/services/ajax.ts'


export async function getDatabasesListService(): Promise<ResDataType> {
  const url = '/api/rest_j/v1/datasource/dbs'
  const data = await ajax.get(url)
  console.log('请求数据了了了了了了了了了', data)
  return data
}

export async function listFileTreesService(path: string) {
  const url = '/api/rest_j/v1/filesystem/getDirFileTrees'
  const data = await ajax.get(url, {params: {path}})
  console.log('xxxxxxxxxxxx', data)
  return data
}
