import { Router, Response } from 'express'

const router = Router()

router.post('/api/users', (_, res:Response) => res.sendStatus(200))

export default router