import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import { createService } from './service';
import { createMemoryRepository } from './repository/repository_memory';
import { initRedisConnnection } from './db/redis';
import { createRedisRepository } from './repository/repository_redis';


export default async function() {
  const app: Express = express()

  app.use(cors())

  const client = await initRedisConnnection(true)
  const service = createService(createRedisRepository(client))

  app.get('/long2short', async (req: Request, res: Response) => {
    const url = req.query.url as string

    let urlData = await service.createOrQueryShort(url)

    res.send({
      success: true,
      message: 'ok',
      data: { short: urlData.short }
    })
  });

  app.get('/short2long', async (req: Request, res: Response) => {
    const short = req.query.short as string
    const urlData = await service.queryByShort(short)
    if (!urlData) {
      return res.send({ success: false, message: 'not found' })
    }
    res.send({
      success: true,
      message: 'ok',
      data: { url: urlData.url }
    })
  })

  return app
}