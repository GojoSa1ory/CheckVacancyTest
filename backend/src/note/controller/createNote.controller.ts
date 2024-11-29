import { RequestNoteDto } from "../dto/requestNote.dto";

import catchControllerErrors from "../../utils/catchControllerErrors";
import {service} from "../service/note.service";


const createNoteController = catchControllerErrors( async (req, res, next) => {
    const request = RequestNoteDto.parse(req.body)
    try {
        const result = await service.createNoteService(request)
        return res.status(200).send(result)    
    } catch (error) {
        return res.status(400).json(
            error
        )
    }

})

export default createNoteController