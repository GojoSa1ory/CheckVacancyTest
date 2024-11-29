import { Router } from "express";
import createNoteController from "../controller/createNote.controller";
import getNotesController from "../controller/getNotes.controller";
import deleteNoteController from "../controller/deleteNote.controller";
import updateNoteController from "../controller/updateNote.controller";

const noteRoute = Router()

noteRoute.post("/create", createNoteController)
noteRoute.get("/get", getNotesController)
noteRoute.delete("/delete/:noteId", deleteNoteController)
noteRoute.patch("/update", updateNoteController)

export default noteRoute