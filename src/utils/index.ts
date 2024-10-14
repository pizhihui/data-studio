


// 修改
// 使用 await sleep(3); // 3 秒
export const sleep = (second: number): Promise<void> => {
  return new Promise(resolve => {setTimeout(resolve, second * 1000)})
}

/**
 *
 *  generateRandomString(10): 输出类似 'aB3kLmN9q2'
 * @param length
 */
export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
