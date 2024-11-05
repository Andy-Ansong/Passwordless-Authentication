import { Router } from 'express'
import eventController from '../controllers/eventController.js'
import auth from '../middleware/auth.js'

const eventRouter = Router()

eventRouter.post('/', auth, eventController.createEvent)
eventRouter.get('/', auth, eventController.getAllEvents)
eventRouter.patch('/:id', auth, eventController.updateEvent)
eventRouter.delete('/:id', auth, eventController.deleteEvent)

export default eventRouter
