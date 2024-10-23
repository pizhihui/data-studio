// 修改
// 使用 await sleep(3); // 3 秒
export const sleep = (second: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, second * 1000)
  })
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

/**
 *
 */
export function getCurrentTime(): string {
  const now = new Date();

  // 格式化时间为 'HH:MM:SS'
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

/**
 *
 */
export function getFormatFullDateTimeStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
