import { 
  Application, 
  send,
  isHttpError
}  from "https://deno.land/x/oak@v4.0.0/mod.ts"
import { renderFileToString } from 'https://deno.land/x/dejs@0.7.0/mod.ts'

import indexRouter from './routes/index_route.ts'

import { connect } from './helpers/db.ts'

connect()

const app = new Application()

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch(err.status) {
        case 404:
          const body = await renderFileToString(
            Deno.cwd() + '/views/not_found.ejs',
            {title: 'pookie.one'}
          );
          ctx.response.body = body;
          break;
        default:
          ctx.response.body =
          'Something went wrong, sorry! Please try again later!';
      }
    }
  }
});

app.use(indexRouter.routes())
app.use(indexRouter.allowedMethods())

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/static`
  })
})

await app.listen({ port: 8000 })