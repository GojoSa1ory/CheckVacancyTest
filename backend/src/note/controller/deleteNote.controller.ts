import catchControllerErrors from "../../utils/catchControllerErrors";
import {service} from "../service/note.service";


const deleteNoteController = catchControllerErrors( async (req, res, next) => {
    try {
        const result = await service.deleteNoteService(req.params.noteId);
        return res.status(200).send(result)
    } catch (error) {
        return res.status(400).send(error)
    }

})

export default deleteNoteController