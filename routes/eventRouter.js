import { Router } from 'express'
import eventController from '../controllers/eventController.js'
import auth from '../middleware/auth.js'

const eventRouter = Router()

eventRouter.post('/', eventController.createEvent)

eventRouter.get('/', eventController.getAllEvents)

eventRouter.get('/:id', eventController.getEvent)

eventRouter.patch('/:id', eventController.updateEvent)

eventRouter.delete('/:id', eventController.deleteEvent)

export default eventRouter
