import { createCrawl, createCrawlOpenAI } from 'x-crawl'

// 创建爬虫应用
const crawlApp = createCrawl({
  maxRetry: 3,
  intervalTime: { max: 2000, min: 1000 }
})

// 创建 AI 应用
// const crawlOpenAIApp = createCrawlOpenAI({
//   clientOptions: { apiKey: process.env['OPENAI_API_KEY'] },
//   defaultModel: { chatModel: 'gpt-4-turbo-preview' }
// })

// crawlPage 用于爬取页面
crawlApp.crawlPage('https://www.airbnb.cn/s/select_homes').then(async (res) => {
  const { page, browser } = res.data

  // 等待元素出现在页面中, 并获取 HTML
  const targetSelector = '[data-tracking-id="TOP_REVIEWED_LISTINGS"]'
  await page.waitForSelector(targetSelector)
  const highlyHTML = await page.$eval(targetSelector, (el) => el.innerHTML)

  console.log('html::::', highlyHTML)
  // // 让 AI 获取图片链接, 并去重 (描述越详细越好)
  // const srcResult = await crawlOpenAIApp.parseElements(
  //   highlyHTML,
  //   '获取图片链接, 不要source里面的, 并去重'
  // )
  //
  //
  // // crawlFile 用于爬取文件资源
  // crawlApp.crawlFile({
  //   targets: srcResult.elements.map((item) => item.src),
  //   storeDirs: './upload'
  // })
  browser.close()
})
