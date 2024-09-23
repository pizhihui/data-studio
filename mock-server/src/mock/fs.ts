// const Mock = require('mockjs')

import Mock from 'mockjs'

const Random = Mock.Random


export const fs = [
  {
    url: '/api/fs/list',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle()
        }
      }
    }
  }
]
