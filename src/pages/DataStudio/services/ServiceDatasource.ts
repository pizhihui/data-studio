import ajax, { ResDataType } from '@/services/ajax.ts'



export interface DbsResp {
  dbs: {dbName: string}[]
}

export interface TablsResp {
  tables: {
    createdAt: number
    createdBy: string
    databaseName: string
    isView: boolean
    lastAccessAt: number
    tableName: string
  }[]
}

/**
 * db list
 */
export async function getDbsTreeService(): Promise<DbsResp> {
  const url = '/datasource/dbs'
  return await ajax.get<DbsResp, DbsResp>(url)
}

/**
 * table list
 */
export async function getTablesTreeService(): Promise<TablsResp> {
  const url = '/datasource/tables'
  return await ajax.get<TablsResp, TablsResp>(url)
}

/**
 * table info
 * @param tablename
 */
export async function getTableInfoService(tablename: string) {
  const url = '/datasource/tableInfo'
  const res = (await ajax.get(url, {params: {tablename}})) as ResDataType
  return res
}

