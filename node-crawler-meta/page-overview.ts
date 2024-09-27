import * as http from 'node:http'
import * as https from 'node:https'
import * as cheerio from 'cheerio'
import mongoose from 'mongoose'

import { fetchData } from './https-demo'
import { McModel } from './model'

const wz = "https://www.alibabacloud.com/help/zh/maxcompute/user-guide/overview-35"; //网址

const url = new URL(wz)

const baseUrl = 'https://' + url.host

// https.get(wz, function (res) {
//   res.on("data", function (chunk) {
//     strHtml += chunk;
//   })
//   res.on("end", function () {
//
//     // console.log(strHtml);
//
//     handleHtml(strHtml)
//
//   });
// })

const strHtml = await fetchData(wz)
handleHtml(strHtml)

function handleHtml(strHtml) {
  const $ = cheerio.load(strHtml);

  const mainHtml = $('main section')
  // 找到
  const funcTypeList = []

  mainHtml.each((index, element) => {
    const h2Element = $(element).find('h2');
    if (h2Element.text().trim() === '背景信息') {

      const tableList = $(element).find('table[id]')
      tableList.find('tr').slice(1).each((index, element) => {
        const text = $(element).find('td').first().text()
        funcTypeList.push(text)
      })
    }
  })

  // 链接
  mainHtml.each((index, element) => {
    const type_name = $(element).find('h2').text()
    console.log('type_name:::::::::', type_name)

    if (!funcTypeList.includes(type_name)) return

    const tableList = $(element).find('table[id]')
    if (tableList.length > 0) {
      tableList.find('tr').slice(1).each( async (index, element) => {
        const functionName = []
        $(element).find('td').each(async (id2, el2) => {
          const aLink = $(el2).find('a').attr('href')
          if (aLink?.length > 0) {
            functionName.push(aLink)

            // 访问
            // const recUrl = baseUrl + aLink
            // https.get(recUrl,function(res){
            //   res.on("data",function(chunk){
            //     strHtml+=chunk;
            //   })
            //   res.on("end",function(){
            //     handleDetail(strHtml)
            //   });
            // })


          }
          functionName.push($(el2).text())
        })
        console.log('::::::::', functionName)

        // 保存 mango
        const insert = new McModel({
            func_name: functionName[1],
            func_desc: functionName[2],
            func_link: functionName[0]
          }
        )
        const res = await insert.save()
        console.log(`保存结果: ${res}`)

      })
    }

  })
}

function handleDetail(strHtml) {
  // console.log(strHtml);
  const $ = cheerio.load(strHtml);

  const funcName = $('header h1').text()
  console.log('函数名称: ', funcName)

  const desc = $('main').children('p').text()
  console.log('描述 xxxxxxxxxx', desc)

  $('main section').each((index, sectionElement) => {
    console.log(`=========================`);

    const pInSection = $(sectionElement).find('h2');
    console.log('标题:', pInSection.text());

    const code = $(sectionElement).find('code');
    if (code.length > 0) {
      console.log('描述信息1::::', code.text());
    }

    const p = $(sectionElement).find('p');
    if (p.length) {
      console.log('描述信息2::::', p.text());
    }
  });
}
