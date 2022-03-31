import { Router } from "express";
import { getLinks, createLink, getAllLinks, deleteLink, updateLink, getLink, deleteAllLinks } from "../controllers/link";
import { authUser } from "../middlewares/jwt-auth";

const noteRouter = Router();

noteRouter.get('/', authUser, getLinks)
noteRouter.get('/:linkId', getLink)
noteRouter.get('/:linkId', getAllLinks)
noteRouter.get('/all', getAllLinks)
noteRouter.post('/', authUser, createLink)
noteRouter.put('/', authUser, updateLink)
noteRouter.delete('/:linkId', authUser, deleteLink)
noteRouter.delete('/', authUser, deleteAllLinks)


export default noteRouter