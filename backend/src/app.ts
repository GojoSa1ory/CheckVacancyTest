import "dotenv/config"
import express from 'express'
import connectToDb from './database/db-connect'
import { SERVER_PORT } from "./config/env"
import errorHandler from "./middleware/errorHandler"
import noteRoute from "./note/route/note.route"
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

app.get("/", (req, res, next) => {
    res.status(200).json({"status": "ok"})
})

app.use("/note", noteRoute)


app.use(errorHandler)
app.listen(SERVER_PORT, async () => {
    console.log(`Server run at port ${SERVER_PORT}`)
    await connectToDb()
})