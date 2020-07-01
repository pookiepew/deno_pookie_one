import { Application, send }  from "https://deno.land/x/oak@v4.0.0/mod.ts"
import { renderFileToString } from 'https://deno.land/x/dejs@0.7.0/mod.ts';

import indexRouter from './routes/index_route.ts'

const app = new Application()

// app.use((ctx, next) => {
//   ctx.response.body = 'Hello Pookie!'
// })

app.use(indexRouter.routes())
app.use(indexRouter.allowedMethods())

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/static`
  })
})

await app.listen({ port: 8000 })