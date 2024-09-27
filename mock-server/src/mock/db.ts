
import Mock from 'mockjs'

const Random = Mock.Random

export const dbs = [
  {
    url: '/api/rest_j/v1/datasource/dbs',
    method: 'get',
    response() {
      return {
        "method": "/api/datasource/dbs",
        "status": 0,
        "message": "OK",
        "data": {
          "dbs": [
            {
              "dbName": "znzz_pipi_ods"
            },
            {
              "dbName": "znzz_pipi_dws"
            },
            {
              "dbName": "znzz_pipi_dwd"
            },
            {
              "dbName": "znzz_pipi_dim"
            },
            {
              "dbName": "znzz_pipi_ads"
            }
          ]
        }
      }
    }
  },
  {
    // database=znzz_fintech_dim
    url: '/api/rest_j/v1/datasource/tables',
    method: 'get',
    response() {
      return {
        "method": "/api/datasource/tables",
        "status": 0,
        "message": "OK",
        "data": {
          "tables": [
            {
              "tableName": "t_dim_" + Random.word(10,20),
              "isView": false,
              "databaseName": "znzz_pipi_dim",
              "createdBy": "RAM$pipi-prod@pipi.163.com:pipi_znzz_zk",
              "createdAt": 1725422598000,
              "lastAccessAt": 1725422598000
            },
            {
              "tableName": "t_dim_" + Random.word(10,20),
              "isView": false,
              "databaseName": "znzz_pipi_dim",
              "createdBy": "RAM$pipi-prod@pipi.163.com:pipi_znzz_zk",
              "createdAt": 1724399871000,
              "lastAccessAt": 1724399871000
            },
            {
              "tableName": "t_dim_" + Random.word(10,20),
              "isView": false,
              "databaseName": "znzz_pipi_dim",
              "createdBy": "RAM$pipi-prod@pipi.163.com:pipi_znzz_zk",
              "createdAt": 1723688425000,
              "lastAccessAt": 1723688425000
            },
            {
              "tableName": "t_dim_" + Random.word(10,20),
              "isView": false,
              "databaseName": "znzz_pipi_dim",
              "createdBy": "RAM$pipi-prod@pipi.163.com:pipi_znzz_zk",
              "createdAt": 1723864657000,
              "lastAccessAt": 1723864657000
            },
            {
              "tableName": "t_dim_" + Random.word(10,20),
              "isView": false,
              "databaseName": "znzz_pipi_dim",
              "createdBy": "RAM$pipi-prod@pipi.163.com:pipi_znzz_zk",
              "createdAt": 1726796869000,
              "lastAccessAt": 1726796869000
            },
            {
              "tableName": "t_dim_" + Random.word(10,20),
              "isView": false,
              "databaseName": "znzz_pipi_dim",
              "createdBy": "RAM$pipi-prod@pipi.163.com:pipi_znzz_zk",
              "createdAt": 1726741072000,
              "lastAccessAt": 1726741072000
            },
            {
              "tableName": "t_dim_" + Random.word(10,20),
              "isView": false,
              "databaseName": "znzz_pipi_dim",
              "createdBy": "RAM$pipi-prod@pipi.163.com:pipi_znzz_zk",
              "createdAt": 1726765204000,
              "lastAccessAt": 1726765204000
            }
          ]
        }
      }
    }
  },
  {
    // ?database=znzz_fintech_dim&table=dim_month_last_day
    url: '/api/rest_j/v1/datasource/columns',
    method: 'get',
    response() {
      return {
        "method": "/api/datasource/columns",
        "status": 0,
        "message": "OK",
        "data": {
          "columns": [
            {
              "columnName": "f_col1",
              "columnType": "string",
              "columnComment": "",
              "partitioned": false
            },
            {
              "columnName": "f_col2",
              "columnType": "string",
              "columnComment": "",
              "partitioned": false
            }
          ]
        }
      }
    }
  },
  {
    // ?pageSize=100&currentPage=1
    url: '/api/rest_j/v1/data-source-manager/info',
    method: 'get',
    response() {
      return {
        "method": "/api/data-source-manager/info",
        "status": 0,
        "message": "OK",
        "data": {
          "totalPage": 3,
          "queryList": [
            {
              "id": 3,
              "dataSourceName": "库11111",
              "dataSourceTypeId": 9,
              "createSystem": "Linkis",
              "createTime": 1724148411000,
              "modifyTime": 1724378615000,
              "modifyUser": "hadoop",
              "createUser": "hadoop",
              "versionId": 4,
              "publishedVersionId": 4,
              "expire": false,
              "dataSourceType": {
                "id": "3",
                "name": "postgresql",
                "layers": 0
              }
            },
            {
              "id": 2,
              "dataSourceName": "库22222",
              "dataSourceTypeId": 19,
              "createSystem": "Linkis",
              "createTime": 1724067051000,
              "modifyTime": 1724333243000,
              "modifyUser": "hadoop",
              "createUser": "hadoop",
              "versionId": 6,
              "publishedVersionId": 6,
              "expire": false,
              "dataSourceType": {
                "id": "2",
                "name": "odps",
                "layers": 0
              }
            },
            {
              "id": 1,
              "dataSourceName": "mysq-meta-linkis",
              "dataSourceTypeId": 5,
              "createSystem": "Linkis",
              "createTime": 1724048034000,
              "modifyTime": 1724048033000,
              "createUser": "hadoop",
              "versionId": 1,
              "publishedVersionId": 1,
              "expire": true,
              "dataSourceType": {
                "id": "1",
                "name": "mysql",
                "layers": 0
              }
            }
          ]
        }
      }
    }
  },
  {
    url: '/api/rest_j/v1/datasource/tableInfo',
    method: 'get',
    response() {
      return  {
        "method": "/api/datasource/columns",
        "status": 0,
        "message": "OK",
        "data": {
          "comment": "表注释",
          "createTableDDL": "CREATE EXTERNAL TABLE IF NOT EXISTS txxxxxx",
          "creationTime": 1727176082000,
          "displayName": "table_xxxxxx",
          "isExternalTable": true,
          "lastDDLTime": 1727176082000,
          "lastModifiedTime": 1727176082000,
          "dbName": "znz_pipi_dwd",
          "type": "external",
          "owner": "pipi-xxxx",
          "nativeColumns": [
            {"comment": "字段注释 1111", "name": "f_col1", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"},
            {"comment": "字段注释 2222", "name": "f_col2", "type": "string"}
          ],
          "partitionColumns": [
            {
              "comment": "分区字段 11111",
              "name": "dt",
              "type": "string"
            },
            {
              "comment": "分区字段 2222",
              "name": "ds",
              "type": "string"
            }
          ]
        }
      }
    }
  }
]
