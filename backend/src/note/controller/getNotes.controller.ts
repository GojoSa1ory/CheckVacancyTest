import catchControllerErrors from "../../utils/catchControllerErrors";
import {service} from "../service/note.service";



const getNotesController = catchControllerErrors( async (req, res, next) => {
    try {
        const result = await service.getNotesService();
        return res.status(200).send(result)
    } catch (error) {
        return res.status(400).send(error)
    }

})

export default getNotesController