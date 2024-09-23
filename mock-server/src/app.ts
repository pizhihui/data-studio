import { Context } from 'koa'
import Koa from 'koa'
import Router from 'koa-router'

import mockList from './mock/index'

const app = new Koa()
const router = new Router()

// app.use(async (ctx: Context) => {
//   ctx.body = 'Hello World';
// });

async function getRes(fn: (ctx: any) => {}, ctx: any) {
  return new Promise(resolve => {
    setTimeout(() => {
      const res = fn(ctx)
      resolve(res)
    }, 1000)
  })
}

console.log('listxxxxxxx', mockList)

// ts type
type RouterMethodType = 'get' | 'put' | 'post' | 'patch' | 'delete' | 'del'

mockList.forEach(item => {
  const { url, method, response } = item
  console.log('xxxxxxxxxxxxx', url, method);
  router[method as RouterMethodType](url, async (ctx: Router.RouterContext) => {
    const res = await getRes(response, ctx)
    console.log('resssssssssss', res)
    ctx.body = res
  })

  // test
  // router.get(url, async (ctx, next) => {
  //   // ctx.router available
  //   const res = await getRes(response, ctx)
  //   console.log('resssssssssss', res)
  //   ctx.body = res
  //
  // });

})

const PORT = 3002
app.use(router.routes())
app.listen(PORT, () => {
  console.log(`服务启动,端口号:${PORT}`)
});

