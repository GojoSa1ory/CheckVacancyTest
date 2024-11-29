import {TypeRequestNoteDto} from "../dto/requestNote.dto";
import NoteDao from "../../database/entity/NoteEntity";
import {ResponseNoteDtoType} from "../dto/responseNote.dto";
import mapToResponse from "../mapper/note.mapper";
import mongoose from "mongoose";
import {RequestUpdateNoteDtoType} from "../dto/requestUpdateNote.dto";

const createNoteService: (dto: TypeRequestNoteDto) => Promise<boolean> = async (dto): Promise<boolean> => {
    await NoteDao.create({
        id: new mongoose.Types.ObjectId(),
        company: dto.company,
        description: dto.description,
        status: dto.status,
        vacancy: dto.vacancy,
        zp: dto.zp
    }).catch((err: Error) => {throw err})

    return true;
}

const getNotesService: () => Promise<ResponseNoteDtoType[]> = async (): Promise<ResponseNoteDtoType[]> => {
    const notes = await NoteDao.find()
    if(notes.length == 0) return []
    return notes.map(note => mapToResponse(note));
}

const deleteNoteService: (noteId: string) => Promise<boolean> = async (noteId): Promise<boolean> => {
    await NoteDao.findByIdAndDelete({_id: noteId}).catch((err: Error) => {throw err})
    return true;
}

const updateNoteService: (note: RequestUpdateNoteDtoType) => Promise<boolean> = async (note): Promise<boolean> => {

    await NoteDao.findByIdAndUpdate({_id: note.id}, {
      company: note.company,
      description: note.description,
      status: note.status,
      zp: note.zp,
      vacancy: note.vacancy
    }).catch(err => {throw err})

    return true
}

export const service = {createNoteService, getNotesService, deleteNoteService, updateNoteService}