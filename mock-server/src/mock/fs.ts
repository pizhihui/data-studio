// const Mock = require('mockjs')

import Mock from 'mockjs'

const Random = Mock.Random


export const fs = [
  {
    // path: file:///data/linkis/users/hadoop
    // path: file:///data/linkis/users/hadoop/3333
    url: '/api/rest_j/v1/filesystem/getDirFileTrees',
    method: 'get',
    response() {
      return {
        "method": "/api/filesystem/getDirFileTrees",
        "status": 0,
        "message": "OK",
        "data": {
          "dirFileTrees": {
            "name": "hadoop",
            "path": "file:///data/linkis/users/hadoop",
            "properties": null,
            "children": [
              {
                "name": "1.sql",
                "path": "file:///data/linkis/users/hadoop/1.sql",
                "properties": {
                  "size": "0",
                  "modifytime": "1724050952000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "111.jdbc",
                "path": "file:///data/linkis/users/hadoop/111.jdbc",
                "properties": {
                  "size": "131",
                  "modifytime": "1727074995000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "333.jdbc",
                "path": "file:///data/linkis/users/hadoop/333.jdbc",
                "properties": {
                  "size": "158",
                  "modifytime": "1727074995000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "aaa.jdbc",
                "path": "file:///data/linkis/users/hadoop/aaa.jdbc",
                "properties": {
                  "size": "0",
                  "modifytime": "1724146231000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "holo_01.jdbc",
                "path": "file:///data/linkis/users/hadoop/holo_01.jdbc",
                "properties": {
                  "size": "196",
                  "modifytime": "1725591993000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "test.jdbc",
                "path": "file:///data/linkis/users/hadoop/test.jdbc",
                "properties": {
                  "size": "142",
                  "modifytime": "1724399493000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "dim_query.jdbc",
                "path": "file:///data/linkis/users/hadoop/dim_query.jdbc",
                "properties": {
                  "size": "561",
                  "modifytime": "1725591993000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "2222",
                "path": "file:///data/linkis/users/hadoop/2222",
                "properties": {},
                "children": null,
                "isLeaf": false,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "3333",
                "path": "file:///data/linkis/users/hadoop/3333",
                "properties": {},
                "children": null,
                "isLeaf": false,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "6666.jdbc",
                "path": "file:///data/linkis/users/hadoop/6666.jdbc",
                "properties": {
                  "size": "110",
                  "modifytime": "1725591993000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              },
              {
                "name": "test_create.jdbc",
                "path": "file:///data/linkis/users/hadoop/test_create.jdbc",
                "properties": {
                  "size": "1976",
                  "modifytime": "1725591745000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/users/hadoop"
              }
            ],
            "isLeaf": false,
            "parentPath": null
          }
        }
      }
    }
  }
]
