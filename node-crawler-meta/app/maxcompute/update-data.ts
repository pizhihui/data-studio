import mongoose from 'mongoose'
import { Schema, model, connect, Model } from 'mongoose';
import { fetchData } from '../utils/https-utils'
import { McModel } from '../model/mc-model'
import * as cheerio from 'cheerio'


const url = 'https://www.alibabacloud.com'

for await (const doc of McModel.find()) {
  console.log(doc.func_name); // Prints documents one at a time
  console.log(doc.func_desc); // Prints documents one at a time
  console.log(doc.func_link); // Prints documents one at a time
  const url = 'https://www.alibabacloud.com/' + doc.func_link
  const strHtml = await fetchData(url)
  const html = handleDetail(strHtml)

  const res = await McModel.updateOne({func_name: doc.func_name}, {func_html: html})

  // const res = await MCModel.updateMany({func_name:{eq:doc.func_name} }, {$set: {func_html:html }})
  console.log('结果:::::', res)
}

// const list = await MCModel.find({})
// list.exec()
// const strHtml = await fetchData('')
// handleDetail(strHtml)


function handleDetail(strHtml) {
  // console.log(strHtml);
  const $ = cheerio.load(strHtml);

  const funcName = $('header h1').text()
  console.log('函数名称: ', funcName)

  const mainHtml = $('main').html()
  console.log(mainHtml)
  return mainHtml
  // const desc = $('main').children('p').text()
  // console.log('描述 xxxxxxxxxx', desc)

  // $('main section').each((index, sectionElement) => {
  //   console.log(`=========================`);
  //
  //   const pInSection = $(sectionElement).find('h2');
  //   console.log('标题:', pInSection.text());
  //
  //   const code = $(sectionElement).find('code');
  //   if (code.length > 0) {
  //     console.log('描述信息1::::', code.text());
  //   }
  //
  //   const p = $(sectionElement).find('p');
  //   if (p.length) {
  //     console.log('描述信息2::::', p.text());
  //   }
  // });
}


