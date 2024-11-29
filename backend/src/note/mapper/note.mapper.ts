import {ResponseNoteDto, ResponseNoteDtoType} from "../dto/responseNote.dto";
import {NoteDocument} from "../../database/entity/NoteEntity";

const mapToResponse: (note: NoteDocument) => ResponseNoteDtoType = (note): ResponseNoteDtoType => ResponseNoteDto.parse(note)

export default mapToResponse