


export interface Result<T = any> {
  status: number
  data: T
  method: string
  message: string
}


declare namespace Login {

  export interface LoginParams {
    userName?: string
    password?: string
    // autoLogin?: boolean
  }

}

export namespace User {
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    mobile: string
    job: string
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
  }
}
