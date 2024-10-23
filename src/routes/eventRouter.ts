import { Router } from 'express'
import eventController from '../controllers/eventController'
import auth from '../middleware/auth'

const eventRouter = Router()

eventRouter.post('/', auth, eventController.createEvent)

eventRouter.get('/', auth, eventController.getAllEvents)

eventRouter.get('/:id', auth, eventController.getEvent)

eventRouter.patch('/:id', auth, eventController.updateEvent)

eventRouter.delete('/:id', auth, eventController.deleteEvent)

export default eventRouter
