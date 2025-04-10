import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { handle } from '@hono/node-server/vercel'

import { env } from "../config/env.js"
import logger from '../config/logger.js'
import corsMiddleware from './middlewares/cors.middleware.js'
import loggingMiddleware from './middlewares/logging.middleware.js'
import router from './routes/routes.js'
import { errors } from './constants/errors.js'
import { connectToDatabase } from '../database/db.js'

const app = new Hono()

app.use(loggingMiddleware)
app.use(corsMiddleware)

app.route("/api", router)

app.notFound((c) => {
  return c.json(errors[404], 404)
})

// try {
//   await connectToDatabase()
// } catch (error) {
//   process.exit(1)
// }

const handler = handle(app);

export default handler

if (env.NODE_ENV === "development") {
  serve({
    fetch: app.fetch,
    port: env.PORT,
  }, (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`)
  })
}
