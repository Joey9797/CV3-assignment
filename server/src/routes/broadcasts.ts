import { Router } from 'express'
import { getBroadcasts } from '../services/broadcastService.js'

const router = Router()

/**
 * GET /api/broadcasts?type=live|homeshopping
 */
router.get('/', async (req, res, next) => {
  try {
    const type = String(req.query.type ?? '')
    const broadcasts = await getBroadcasts(type)
    res.json({ data: broadcasts })
  } catch (error) {
    next(error)
  }
})

export default router
