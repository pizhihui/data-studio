import { Menu } from '@/services/types/menu'
export interface IAuthLoader {
  buttonList: string[]
  menuList: Menu.MenuItem[]
  menuPathList: string[]
}
export default async function AuthLoader(): Promise<IAuthLoader> {
  // const data = await api.getPermissionList()
  // const menuPathList = getMenuPath(data.menuList)
  console.log('auth loader auth loader ')
  return {
    buttonList: [],
    menuList: [],
    menuPathList: []
  }
}
