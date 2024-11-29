import mongoose from "mongoose";

export interface NoteDocument extends mongoose.Document {
    company: string,
    vacancy: string,
    zp: number,
    status: boolean,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

const noteSchema = new mongoose.Schema<NoteDocument>({
    company: {
        type: String,
        required: true
    },
    vacancy: {
        type: String,
        required: true
    },
    zp: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        required: true
    },
}, {timestamps: true})

const NoteDao = mongoose.model("Note", noteSchema)

export default NoteDao
