import {
  RouterContext,
  HttpError
} from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { renderFileToString } from 'https://deno.land/x/dejs@0.7.0/mod.ts'

type RContext = RouterContext<
  Record<string | number, string | undefined>,
  Record<string, any>
>;



export async function renderIndex(ctx: RContext) {
  try {
    
    const body = await renderFileToString(
      Deno.cwd() + '/views/index.ejs',
      {
        title: 'pookie.one'
      }
    )
    ctx.response.body = body
  } catch (err) {
    const error = new HttpError()
    throw error
  }
}