


// 修改
// 使用 await sleep(3); // 3 秒
export const sleep = (second: number): Promise<void> => {
  return new Promise(resolve => {setTimeout(resolve, second * 1000)})
}

