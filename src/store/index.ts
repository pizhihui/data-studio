import { create } from 'zustand'
import { User } from '@/services/types/api'
import { devtools } from 'zustand/middleware'


interface UserType {
  userInfo: User.UserItem
  updateUserInfo: (userInfo: User.UserItem) => void
}

export const useStore = create<UserType>()(devtools((set) => ({
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    mobile: '',
    job: '',
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: ''
  },
  updateUserInfo: (userInfo: User.UserItem) => set({userInfo})
}),  {
  name: 'user_store', // 浏览器调试时显示的 store 名称
  enabled: true, // 是否开启调试工具(通常根据当前环境开启/关闭)
}))

