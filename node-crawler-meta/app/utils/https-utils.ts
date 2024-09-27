import * as https from 'node:https'

// 封装 https 请求为 Promise
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      // 接收数据
      res.on('data', (chunk) => {
        data += chunk;
      });

      // 请求结束
      res.on('end', () => {
        resolve(data); // 返回接收到的数据
      });
    }).on('error', (err) => {
      reject(err); // 处理错误
    });
  });
}

// 使用 async/await 进行 HTTPS 请求
export async function fetchData(url: string) {
  // const url = 'https://jsonplaceholder.typicode.com/posts/1'; // 示例 URL
  try {
    const result = await fetchUrl(url);
    // if (typeof result === "string") {
    //   console.log('请求结果:', JSON.parse(result));
    // } // 输出请求结果
    return result
  } catch (error) {
    console.error('请求失败:', error); // 处理错误
  }
}

// 执行 fetchData 函数
// fetchData('https://jsonplaceholder.typicode.com/posts/1');
