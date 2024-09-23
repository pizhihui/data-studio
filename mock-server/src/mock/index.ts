

import { fs } from './fs'
import { dbs } from './db'
import { users } from './user'


const mockList = [
  ...fs,
  ...dbs,
  ...users
]

export default mockList
