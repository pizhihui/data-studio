


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
              "dbName": "znzz_hdw_ods"
            },
            {
              "dbName": "znzz_fintech_dws"
            },
            {
              "dbName": "znzz_fintech_dwd"
            },
            {
              "dbName": "znzz_fintech_dim"
            },
            {
              "dbName": "znzz_fintech_ads"
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
              "tableName": "dim_month_last_day",
              "isView": false,
              "databaseName": "znzz_fintech_dim",
              "createdBy": "RAM$jzfq-prd@juzifenqi.com:znzz_fintech_ak",
              "createdAt": 1725422598000,
              "lastAccessAt": 1725422598000
            },
            {
              "tableName": "dim_pub_channel_fd",
              "isView": false,
              "databaseName": "znzz_fintech_dim",
              "createdBy": "RAM$jzfq-prd@juzifenqi.com:znzz_fintech_ak",
              "createdAt": 1724399871000,
              "lastAccessAt": 1724399871000
            },
            {
              "tableName": "dim_pub_user_fd",
              "isView": false,
              "databaseName": "znzz_fintech_dim",
              "createdBy": "RAM$jzfq-prd@juzifenqi.com:znzz_fintech_ak",
              "createdAt": 1723688425000,
              "lastAccessAt": 1723688425000
            },
            {
              "tableName": "dim_user_credit_detail_fd",
              "isView": false,
              "databaseName": "znzz_fintech_dim",
              "createdBy": "RAM$jzfq-prd@juzifenqi.com:znzz_fintech_ak",
              "createdAt": 1723864657000,
              "lastAccessAt": 1723864657000
            },
            {
              "tableName": "f_fintech_ods_risk_model_config_model_run_record_dd",
              "isView": false,
              "databaseName": "znzz_fintech_dim",
              "createdBy": "RAM$jzfq-prd@juzifenqi.com:znzz_fintech_ak",
              "createdAt": 1726796869000,
              "lastAccessAt": 1726796869000
            },
            {
              "tableName": "t_ods_fms_repay_plan_v2_df",
              "isView": false,
              "databaseName": "znzz_fintech_dim",
              "createdBy": "RAM$jzfq-prd@juzifenqi.com:znzz_fintech_ak",
              "createdAt": 1726741072000,
              "lastAccessAt": 1726741072000
            },
            {
              "tableName": "t_ods_rms_third_yhx_credit_authorization_pbc_dd",
              "isView": false,
              "databaseName": "znzz_fintech_dim",
              "createdBy": "RAM$jzfq-prd@juzifenqi.com:znzz_fintech_ak",
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
              "columnName": "mob_date",
              "columnType": "string",
              "columnComment": "",
              "partitioned": false
            }
          ]
        }
      }
    }
  }
]
