import {
  RouterContext,
  HttpError
} from 'https://deno.land/x/oak@v4.0.0/mod.ts'

import { 
  WebSocket,
  acceptWebSocket,
  isWebSocketCloseEvent,
  acceptable 
} from 'https://deno.land/std@0.51.0/ws/mod.ts'

import {
  v4
} from 'https://deno.land/std@0.51.0/uuid/mod.ts'

type RContext = RouterContext<
  Record<string | number, string | undefined>,
  Record<string, any>
>;

let connections = new Map<string, WebSocket>()

export const socketHandler = async (ctx: any) => {

  if (acceptable(ctx.request.serverRequest)) {

    const { conn, r: bufReader, w: bufWriter, headers } = ctx.request.serverRequest;
    
    const socket = await acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    });

    await socketEventHandler(socket)

  } else {
    throw new Error('Error when connecting websocket');
  }
}

const socketEventHandler = async (ws: WebSocket) => {

  for await (const ev of ws) {

    // console.log(ev)
    // console.log(typeof ev)
    
    if (typeof ev === 'string') {
      const payload = JSON.parse(ev)
      const start = payload.start
      if (payload.action === 'ping') {
        ws.send(JSON.stringify({
          action: 'ping',
          message: 'pong!',
          start: start
        }))
      }
    }
  }
}