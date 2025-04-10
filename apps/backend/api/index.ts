import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { handle } from '@hono/node-server/vercel'

import { env } from "../config/env.ts"
import logger from '../config/logger.ts'
import corsMiddleware from './middlewares/cors.middleware.ts'
import loggingMiddleware from './middlewares/logging.middleware.ts'
import router from './routes/routes.ts'
import { errors } from './constants/errors.ts'

const app = new Hono()

app.use(loggingMiddleware)
app.use(corsMiddleware)

app.route("/api", router)

app.notFound((c) => {
  return c.json(errors[404], 404)
})

const handler = handle(app);
export default handler;

if (env.NODE_ENV === "development") {
  serve({
    fetch: app.fetch,
    port: env.PORT,
  }, (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`)
  })
}
