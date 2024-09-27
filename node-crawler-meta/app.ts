

import { createCrawl, createCrawlOpenAI } from 'x-crawl'

// 创建爬虫应用
const crawlApp = createCrawl({
  // 选项
  maxRetry: 3,
})

// 创建 AI 应用
// const crawlOpenAIApp = createCrawlOpenAI({
//   clientOptions: { apiKey: process.env['OPENAI_API_KEY'] },
//   defaultModel: { chatModel: 'gpt-4-turbo-preview' }
// })

// crawlPage 用于爬取页面
crawlApp.crawlPage(
  'https://www.alibabacloud.com/help/zh/maxcompute/user-guide/abs#reference-2249917'
).then(async (res) => {
  const { browser, page } = res.data
  // 关闭浏览器
  // const elSelector = 'id="refbody-p9c-upo-dn1"'
  const elSelector = '[id="reference-2249917"]'
  // const elSelector = 'body'
  // 等待页面元素出现
  await page.waitForSelector(elSelector)

  const highlyHTML = await page.$eval(elSelector, (el) => el.innerHTML)
  console.log('highlyHTML::::::', highlyHTML)

  const h2List = document.querySelectorAll('h2')
  console.log(h2List)
//   const title = await page.$('h1')
// // 遍历每个 h2 元素并获取其 outerHTML
//   title.
//   const title = await page.evaluate(el => el.innerText, title)
//   for (let element of title) {
//     const htmlContent = await page.evaluate(el => el.innerText, element);
//     console.log('H2 HTML content:', htmlContent);  // 输出每个 h2 元素的 HTML 内容
//   }
//
//   const h2Elements = await page.$$('h2')

  //
  // // 让 AI 获取图片链接, 并去重 (描述越详细越好)
  // const srcResult = await crawlOpenAIApp.parseElements(
  //   highlyHTML,
  //   '获取图片链接, 不要source里面的, 并去重'
  // )
  //
  browser.close()
  //
  // console.log('srcResultsrcResult:::::::::::::',srcResult)

})
