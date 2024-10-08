import ajax, { ResDataType } from '@/services/ajax.ts'
import { quat } from 'gl-matrix'
import exp = module


export async function getDbsTreeService(): Promise<ResDataType> {
  const url = '/api/rest_j/v1/datasource/dbs'
  return await ajax.get(url)
}

export async function getTablesTreeService(): Promise<ResDataType> {
  const url = '/api/rest_j/v1/datasource/tables'
  return await ajax.get(url)
}

export async function listFileTreesService(path: string) {
  const url = '/api/rest_j/v1/filesystem/getDirFileTrees'
  const data = await ajax.get(url, {params: {path}})
  return data
}

export async function getTableInfoService(tablename: string) {
  const url = '/api/rest_j/v1/datasource/tableInfo'
  return await ajax.get(url, {params: {tablename}})
}
