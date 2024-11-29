import {Note} from "../../model/note.model.ts";
import NoteCard from "../note-card/NoteCard.tsx";
import './note-list.style.css'
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import service from "../../service/note.service.ts";
import {AxiosResponse} from "axios";


function NoteList() {

    const query:UseQueryResult<AxiosResponse<Note[]>> = useQuery({
        queryKey: ["getNotes"],
        queryFn: service.getNotes
    })

    const item = query.data?.data.map((note: Note) => (
        <li key={note.id}>
            <NoteCard note={note}/>
        </li>
    ))

    return <ul className="noteList">{item}</ul>
}

export default NoteList;