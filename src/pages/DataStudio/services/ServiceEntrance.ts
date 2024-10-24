import ajax from '@/services/ajax.ts'

export interface ExecuteReq {
  executeApplicationName: string
  executionCode: string
  runType: string
  source: {
    scriptPath: string
  }
  params: {
    variable: any
    configuration: {
      startup: any
      special: any
      runtime: {
        [key: string]: string
      }
    }
  }
}

export interface ExecuteResp {
  taskID: number
  execID: string
}

const reqData: ExecuteReq = {
  executeApplicationName: 'jdbc',
  executionCode: '"    select\\n      id_no_des\\n    from\\n      znzz_fintech_dwd.dwd_cap_loan_fd\\n    WHERE\\n      channel_id IN (\\n        \'235\',\\n        \'227\',\\n        \'231\',\\n        \'226\',\\n        \'234\',\\n        \'209\',\\n        \'229\',\\n        \'213\',\\n        \'233\'\\n      )\\n      and dt = \'2024-10-22\' limit 10 \\n    \\n"',
  runType: 'jdbc',
  source: {
    scriptPath: 'file:///data/linkis/users/hadoop/test_1021.jdbc'
  },
  params: {
    variable: {},
    configuration: {
      startup: {},
      special: {},
      runtime: {
        'wds.linkis.engine.runtime.datasource': '离线库'
      }
    }
  }
}

export interface ExecStatusResp {
  execID: string
  status: 'Running' | 'Succeed'
}

export interface TaskResp {
  task: {
    taskID: number
    instance: string
    execId: string
    umUser: string
    executeUser: string
    engineInstance: string
    executionCode: string
    progress: string
    logPath: string
    resultLocation: string
    status: string
    createdTime: number
    updatedTime: number
    engineType: string
    errCode: any
    errDesc: any
    executeApplicationName: string
    requestApplicationName: string
    runType: string
    paramsJson: string
    costTime: number
    strongerExecId: string
    sourceJson: string
    sourceTailor: string
    engineStartTime: any
    labels: string[]
    canRetry: boolean
    observeInfo: any
    subJobs: any
  }
}

export interface LogResp {
  fromLine: number
  log: string[]
  execID: string
}

/**
 *  execute 接口
 */
export async function execute(executeReq: ExecuteReq): Promise<ExecuteResp> {
  const url = '/entrance/execute'
  return await ajax.post<ExecuteResp, ExecuteResp, ExecuteReq>(url, executeReq)
}

/**
 * status
 * @param taskID
 * @param execId
 */
export async function execStatus(taskID: number, execId: string): Promise<ExecStatusResp> {
  const url = `/entrance/${execId}/status`
  return await ajax.get<ExecStatusResp, ExecStatusResp>(url, {params: {taskID}})
}

/**
 * progressWithResource
 *
 */

/**
 * jobhistory get
 */
export async function jobHistory(taskID: number): Promise<TaskResp> {
  const url = `/jobhistory/${taskID}/get`
  return await ajax.get<TaskResp, TaskResp>(url)
}

/**
 * log get
 */
export async function logGet(execId: string, fromLine: number, size: number): Promise<LogResp> {
  const url = `/entrance/${execId}/log`
  return await ajax.get<LogResp, LogResp>(url)
}
