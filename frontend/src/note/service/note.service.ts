import {Note} from "../model/note.model.ts";
import axios, {AxiosResponse} from "axios";
import {CREATE_NOTE_URL, DELETE_NOTE_URL, GET_NOTES_URL, UPDATE_NOTE_URL} from "../../constant/url.ts";

class NoteService {

    async createNote(note: Note): Promise<AxiosResponse<boolean>> {
        return await axios.post(CREATE_NOTE_URL, note);
    }

    async getNotes(): Promise<AxiosResponse<Note[]>> {
        return await axios.get<Note[]>(GET_NOTES_URL);
    }

    async deleteNote(noteId: string): Promise<AxiosResponse<boolean>> {
        return await axios.delete<boolean>(`${DELETE_NOTE_URL}/${noteId}`);
    }

    async updateNote(note: Note): Promise<AxiosResponse<boolean>> {
        return await axios.patch<boolean>(UPDATE_NOTE_URL, note)
    }
}

const service = new NoteService();

export default service;