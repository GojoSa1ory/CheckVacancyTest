import { ErrorRequestHandler, Response } from "express";
import {ZodError} from "zod"

const handleZodError = (res: Response, error: ZodError) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message
    }))

    return res.status(400).json({
        message: error.message,
        errors
    })
}


const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
    console.log(`PATH: ${req.path}`, err)

    if(err instanceof ZodError) {
        handleZodError(res, err)
    }

    return res.status(500).send("Internal error")
}

export default errorHandler