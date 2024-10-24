import ajax, { ResDataType } from '@/services/ajax.ts'


export interface DirFileTreesResp {
  properties: {
    modifytime?: string
    size?: string
  }
  path: string
  parentPath: string
  name: string
  isLeaf: boolean
  children: DirFileTreesResp[]
}

export interface OpenFileResp {
  type: string
  totalPage: number
  totalLine: number
  page: number
  metadata: {
    columnName: string
    comment: string
    dataType: string
  }[]
  fileContent: string[]
}

/**
 * 获取文件目录树
 * @param path
 */
export async function listFileTreesService(path: string): Promise<DirFileTreesResp> {
  const url = '/filesystem/getDirFileTrees'
  return await ajax.get<DirFileTreesResp, DirFileTreesResp>(url, {params: {path}})
}

/**
 * 打开文件,包含数据结果等
 * @param path
 */
export async function getQueryDataResultService(path: string): Promise<OpenFileResp> {
  const url = '/filesystem/openFile'
  return await ajax.get<OpenFileResp, OpenFileResp>(url, {params: {path}})
}
