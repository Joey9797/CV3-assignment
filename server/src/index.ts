import app from './app.js'
import env from './config/env.js'
import { warmUpCategoryCache } from './services/broadcastService.js'

async function start() {
  await warmUpCategoryCache()

  app.listen(env.port, () => {
    console.log(`Server is running on http://localhost:${env.port}`)
  })
}

start()
