import * as http from 'node:http'
import * as https from 'node:https'
import * as cheerio from 'cheerio'


const wz="https://www.alibabacloud.com/help/zh/maxcompute/user-guide/abs#reference-2249917"; //网址

var strHtml="";
var results=[];
https.get(wz,function(res){
  res.on("data",function(chunk){
    strHtml+=chunk;
  })
  res.on("end",function(){

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

  });
})
