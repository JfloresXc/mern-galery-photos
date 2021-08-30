import { Router } from 'express'
import controller from '../controllers/publications.controllers'
import { fileMiddleware } from '../middlewares/file.middlewares'

const {
    getPublications,
    postPublication,
    deletePublication,
    getPublication, 
    postPublicationsTitle
} = controller

const route = new Router()

route.get('/', getPublications)
route.post('/', fileMiddleware, postPublication)
route.post('/title', postPublicationsTitle)

route.get('/:id', getPublication)
route.delete('/:id', deletePublication)

export default route
