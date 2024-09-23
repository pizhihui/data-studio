import Mock from 'mockjs'

const Random = Mock.Random

export const tasks = [
  {
    url: '/api/rest_j/v1/entrance/execute',
    method: 'post',
    // {"executeApplicationName":"jdbc","executionCode":"select count(1) from  znzz_fintech_ads.hjy_bal_exists\nwhere dt='2024-09-05'\n","runType":"jdbc","params":{"configuration":{"special":{},"runtime":{"wds.linkis.engine.runtime.datasource":"离线库"},"startup":{}},"variable":{}},"source":{"scriptPath":"file:///data/linkis/users/hadoop/333.jdbc"}}
    response() {
      return {
        "method": "/api/entrance/execute",
        "status": 0,
        "message": "OK",
        "data": {
          "taskID": 753,
          "execID": "exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0"
        }
      }
    }
  },
  {
    // ?taskID=753
    // /api/rest_j/v1/entrance/exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0/status
    url: '/api/rest_j/v1/entrance/:id/status',
    method: 'get',
    response() {
      return {
        "method": "/api/entrance/exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0/status",
        "status": 0,
        "message": "OK",
        "data": {
          "status": "Running",
          "execID": "exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0"
        }
      }
    }
  },
  {
    // {"path":"file:///data/linkis/users/hadoop/444.jdbc","scriptContent":"select * from  znzz_fintech_ads.hjy_bal_exists\nwhere dt='2024-09-05' limit 10","params":{"variable":{},"configuration":{"runtime":{"wds.linkis.engine.runtime.datasource":"离线库"}}}}
    url: '/api/rest_j/v1/filesystem/saveScript',
    method: 'post',
    response() {
      return {"method":"/api/filesystem/saveScript","status":0,"message":"OK","data":{}}
    }
  },
  {
    // 轮训查
    url: '/api/rest_j/v1/jobhistory/753/get',
    method: 'get',
    response() {
      return {
        "method": "/api/jobhistory/753/get",
        "status": 0,
        "message": "OK",
        "data": {
          "task": {
            "taskID": 753,
            "instance": "sz-margin-bigdata-xxjob:9104",
            "execId": "IDE_hadoop_jdbc_0",
            "umUser": "hadoop",
            "executeUser": "hadoop",
            "engineInstance": "sz-margin-bigdata-xxjob:32792",
            "executionCode": "select count(1) from  znzz_fintech_ads.hjy_bal_exists\nwhere dt='2024-09-05'\n",
            "progress": "1.0",
            "logPath": "file:///data/linkis/hadoop/log/IDE/2024-09-23/753.log",
            "resultLocation": "file:///data/linkis/result/2024-09-23/IDE/hadoop/753",
            "status": "Succeed",
            "createdTime": 1727076297341,
            "updatedTime": 1727076302611,
            "engineType": "jdbc",
            "errCode": 0,
            "errDesc": "",
            "executeApplicationName": "jdbc",
            "requestApplicationName": "IDE",
            "runType": "jdbc",
            "paramsJson": "{\"configuration\":{\"special\":{},\"runtime\":{\"wds.linkis.engine.runtime.datasource\":\"离线库\",\"source\":{\"scriptPath\":\"file:///data/linkis/users/hadoop/333.jdbc\",\"requestIP\":\"61.144.186.159\"},\"jobId\":\"753\",\"job\":{\"#rt_rs_store_path\":\"file:///data/linkis/result/2024-09-23/IDE/hadoop/753\"}},\"startup\":{\"jobId\":\"753\"}},\"variable\":{}}",
            "costTime": 5000,
            "strongerExecId": "exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0",
            "sourceJson": "{\"scriptPath\":\"file:///data/linkis/users/hadoop/333.jdbc\",\"requestIP\":\"61.144.186.159\"}",
            "sourceTailor": "file:///data/linkis/users/hadoop/333.jdbc-61.144.186.159",
            "engineStartTime": null,
            "labels": [
              "userCreator:hadoop-IDE",
              "codeType:jdbc",
              "engineType:jdbc-4"
            ],
            "canRetry": false,
            "observeInfo": null,
            "subJobs": null
          }
        }
      }
    }
  },
  {
    // ?fromLine=1&size=-1
    // /api/rest_j/v1/entrance/exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0/log
    url: '/api/rest_j/v1/entrance/:id/log',
    method: 'get',
    response() {
      return {
        "method": "/api/entrance/exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0/log",
        "status": 0,
        "message": "OK",
        "data": {
          "fromLine": 33,
          "log": [
            "",
            "2024-09-23 15:24:57.024 WARN You submitted a sql without limit, DSS will add limit 5000 to your sql",
            "2024-09-23 15:24:57.024 INFO Program is substituting variables for you\n2024-09-23 15:24:57.024 INFO Variables substitution ended successfully\n2024-09-23 15:24:57.024 INFO You have submitted a new job, script code (after variable substitution) is\n************************************SCRIPT CODE************************************\nselect count(1) from  znzz_fintech_ads.hjy_bal_exists\nwhere dt='2024-09-05'\n************************************SCRIPT CODE************************************\n2024-09-23 15:24:57.024 INFO SQL code check has passed\n2024-09-23 15:24:57.024 INFO Job with jobId : 753 and execID : IDE_hadoop_jdbc_0 submitted \n2024-09-23 15:24:57.024 INFO Your job is accepted,  jobID is exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0 and taskID is 753 in ServiceInstance(linkis-cg-entrance, sz-margin-bigdata-xxjob:9104, 0). \n Please wait it to be scheduled(您的任务已经提交，进入排队中，如果一直没有更新日志，是任务并发达到了限制，可以进行参数修改)\n2024-09-23 15:24:57.024 INFO Your job is Scheduled. Please wait it to run.(您的任务已经调度运行中)\n2024-09-23 15:24:57.024 INFO Your job is being scheduled by orchestrator.\n2024-09-23 15:24:57.024 INFO Your job is Running now. Please wait it to complete.(您的任务已经在运行中)\n2024-09-23 15:24:57.024 INFO JobRequest (753) was submitted to Orchestrator.(您的任务已经提交给Orchestrator进行编排执行)\n2024-09-23 15:24:57.024 INFO Background is starting a new engine for you,execId TaskID_753_otJobId_astJob_240_codeExec_240 mark id is mark_240, it may take several seconds, please wait\n2024-09-23 15:24:57.024 INFO Succeed to reuse ec : ServiceInstance(linkis-cg-engineconn, sz-margin-bigdata-xxjob:32792, 0)\n2024-09-23 15:24:57.024 INFO Task submit to ec: ServiceInstance(linkis-cg-engineconn, sz-margin-bigdata-xxjob:32792, 0) get engineConnExecId is: 291\n2024-09-23 15:24:57.024 INFO EngineConn local log path: ServiceInstance(linkis-cg-engineconn, sz-margin-bigdata-xxjob:32792, 0) /data/linkis/engine/hadoop/20240906/jdbc/47336da7-e6d5-4334-a822-2c6d9e83e8dd/logs\nfile:///data/linkis/result/2024-09-23/IDE/hadoop/753/_0.dolphin\n2024-09-23 15:25:02.025 INFO Congratulations! Your job : IDE_hadoop_jdbc_0 executed with status succeed and 2 results.\n2024-09-23 15:25:02.025 INFO Task time point information(任务时间节点信息):\n[Task creation time(任务创建时间)]  :2024-09-23 15:24:57\n[Task scheduling time(任务调度时间)]:2024-09-23 15:24:57\n[Task start time(任务开始时间)]     :2024-09-23 15:24:57\n[Task end time(任务结束时间)]       :2024-09-23 15:25:02\n2024-09-23 15:25:02.025 INFO [Task submit to Orchestrator time]:2024-09-23 15:24:57\n[Task request EngineConn time]    :2024-09-23 15:24:57\n[Task submit to EngineConn time]  :2024-09-23 15:24:57\n2024-09-23 15:25:02.025 INFO Your task jobId(您的任务) 753 The total time spent is(总耗时时间为): 5.2 s\n2024-09-23 15:25:02.025 INFO Congratulations. Your job completed with status Success.",
            "2024-09-23 15:24:57.024 INFO Program is substituting variables for you\n2024-09-23 15:24:57.024 INFO Variables substitution ended successfully\n2024-09-23 15:24:57.024 INFO You have submitted a new job, script code (after variable substitution) is\n************************************SCRIPT CODE************************************\nselect count(1) from  znzz_fintech_ads.hjy_bal_exists\nwhere dt='2024-09-05'\n************************************SCRIPT CODE************************************\n2024-09-23 15:24:57.024 WARN You submitted a sql without limit, DSS will add limit 5000 to your sql\n2024-09-23 15:24:57.024 INFO SQL code check has passed\n2024-09-23 15:24:57.024 INFO Job with jobId : 753 and execID : IDE_hadoop_jdbc_0 submitted \n2024-09-23 15:24:57.024 INFO Your job is accepted,  jobID is exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0 and taskID is 753 in ServiceInstance(linkis-cg-entrance, sz-margin-bigdata-xxjob:9104, 0). \n Please wait it to be scheduled(您的任务已经提交，进入排队中，如果一直没有更新日志，是任务并发达到了限制，可以进行参数修改)\n2024-09-23 15:24:57.024 INFO Your job is Scheduled. Please wait it to run.(您的任务已经调度运行中)\n2024-09-23 15:24:57.024 INFO Your job is being scheduled by orchestrator.\n2024-09-23 15:24:57.024 INFO Your job is Running now. Please wait it to complete.(您的任务已经在运行中)\n2024-09-23 15:24:57.024 INFO JobRequest (753) was submitted to Orchestrator.(您的任务已经提交给Orchestrator进行编排执行)\n2024-09-23 15:24:57.024 INFO Background is starting a new engine for you,execId TaskID_753_otJobId_astJob_240_codeExec_240 mark id is mark_240, it may take several seconds, please wait\n2024-09-23 15:24:57.024 INFO Succeed to reuse ec : ServiceInstance(linkis-cg-engineconn, sz-margin-bigdata-xxjob:32792, 0)\n2024-09-23 15:24:57.024 INFO Task submit to ec: ServiceInstance(linkis-cg-engineconn, sz-margin-bigdata-xxjob:32792, 0) get engineConnExecId is: 291\n2024-09-23 15:24:57.024 INFO EngineConn local log path: ServiceInstance(linkis-cg-engineconn, sz-margin-bigdata-xxjob:32792, 0) /data/linkis/engine/hadoop/20240906/jdbc/47336da7-e6d5-4334-a822-2c6d9e83e8dd/logs\nfile:///data/linkis/result/2024-09-23/IDE/hadoop/753/_0.dolphin\n2024-09-23 15:25:02.025 INFO Congratulations! Your job : IDE_hadoop_jdbc_0 executed with status succeed and 2 results.\n2024-09-23 15:25:02.025 INFO Task time point information(任务时间节点信息):\n[Task creation time(任务创建时间)]  :2024-09-23 15:24:57\n[Task scheduling time(任务调度时间)]:2024-09-23 15:24:57\n[Task start time(任务开始时间)]     :2024-09-23 15:24:57\n[Task end time(任务结束时间)]       :2024-09-23 15:25:02\n2024-09-23 15:25:02.025 INFO [Task submit to Orchestrator time]:2024-09-23 15:24:57\n[Task request EngineConn time]    :2024-09-23 15:24:57\n[Task submit to EngineConn time]  :2024-09-23 15:24:57\n2024-09-23 15:25:02.025 INFO Your task jobId(您的任务) 753 The total time spent is(总耗时时间为): 5.2 s\n2024-09-23 15:25:02.025 INFO Congratulations. Your job completed with status Success."
          ],
          "execID": "exec_id018028linkis-cg-entrancesz-margin-bigdata-xxjob:9104IDE_hadoop_jdbc_0"
        }
      }
    }
  },
  {
    // path: file:///data/linkis/result/2024-09-23/IDE/hadoop/754
    // ?path=file:%2F%2F%2Fdata%2Flinkis%2Fresult%2F2024-09-23%2FIDE%2Fhadoop%2F754
    url: '/api/rest_j/v1/filesystem/getDirFileTrees',
    method: 'get',
    response() {
      return {
        "method": "/api/filesystem/getDirFileTrees",
        "status": 0,
        "message": "OK",
        "data": {
          "dirFileTrees": {
            "name": "754",
            "path": "file:///data/linkis/result/2024-09-23/IDE/hadoop/754",
            "properties": null,
            "children": [
              {
                "name": "_0.dolphin",
                "path": "file:///data/linkis/result/2024-09-23/IDE/hadoop/754/_0.dolphin",
                "properties": {
                  "size": "1240",
                  "modifytime": "1727076617000"
                },
                "children": null,
                "isLeaf": true,
                "parentPath": "file:///data/linkis/result/2024-09-23/IDE/hadoop/754"
              }
            ],
            "isLeaf": false,
            "parentPath": null
          }
        }
      }
    }
  },
  {
    // path: file:///data/linkis/result/2024-09-23/IDE/hadoop/754/_0.dolphin
    // ?path=file:%2F%2F%2Fdata%2Flinkis%2Fresult%2F2024-09-23%2FIDE%2Fhadoop%2F754%2F_0.dolphin
    url: '/api/rest_j/v1/filesystem/openFile',
    method: 'get',
    response() {
      return {
        "method": "/api/filesystem/openFile",
        "status": 0,
        "message": "OK",
        "data": {
          "metadata": [
            {
              "dataType": "int",
              "comment": "",
              "columnName": "f_col1"
            },
            {
              "dataType": "string",
              "comment": "",
              "columnName": "f_col2"
            },
            {
              "dataType": "int",
              "comment": "",
              "columnName": "f_col3"
            },
            {
              "dataType": "int",
              "comment": "",
              "columnName": "f_col4"
            },
            {
              "dataType": "int",
              "comment": "",
              "columnName": "f_col5"
            },
            {
              "dataType": "int",
              "comment": "",
              "columnName": "f_col6"
            },
            {
              "dataType": "string",
              "comment": "",
              "columnName": "dt"
            }
          ],
          "totalPage": 0,
          "totalLine": 10,
          "page": 1,
          "type": "2",
          "fileContent": [
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "1",
              "1",
              "1",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "1",
              "1",
              "1",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "1",
              "1",
              "1",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "209",
              "1",
              "1",
              "1",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "1",
              "1",
              "1",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "0",
              "0",
              "0",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "1",
              "1",
              "1",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "1",
              "1",
              "1",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "1",
              "1",
              "1",
              "2024-09-05"
            ],
            [
              Random.string('number',8, 9),
              Random.word(20, 40),
              "227",
              "1",
              "1",
              "1",
              "2024-09-05"
            ]
          ]
        }
      }
    }
  }
]
