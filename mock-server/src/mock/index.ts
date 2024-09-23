

import { fs } from './fs'
import { dbs } from './db'
import { users } from './user'
import { tasks } from './task'


const mockList = [
  ...fs,
  ...dbs,
  ...users,
  ...tasks
]

export default mockList
