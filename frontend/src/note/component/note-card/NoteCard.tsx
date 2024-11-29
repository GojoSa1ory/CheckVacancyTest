import {Note} from "../../model/note.model.ts";
import './note.style.css'
import VacancyStatus from "../vacancy-status/VacancyStatus.tsx";
import Button from "../../../shared/Button/Button.tsx";
import service from "../../service/note.service.ts";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type DefaultNoteCardProps = {
    note: Note,
    onReadOnlyChange: () => void
    delete: () => void
}

function DefaultNoteCard(props: DefaultNoteCardProps) {

    return (
        <div className="note-card">

            <div className="note-card-header">
                <h1>{props.note.vacancy}</h1>
                <h2>{props.note.zp}$</h2>
            </div>

            <div>
                <p className="note-card-company">{props.note.company}</p>
                <p className="note-card-description">{props.note.description}</p>
            </div>

            <div className="note-card-footer">
                <VacancyStatus status={props.note.status}/>

                <div>
                    <Button title={"Delete"} onClick={() => props.delete()}/>
                    <Button title={"Change"} onClick={() => props.onReadOnlyChange()}/>
                </div>
            </div>
        </div>
    )
}

type UpdateNoteCardProps = {
    note: Note,
    onReadOnlyChange: () => void
    save: (note: Note) => void
}

function UpdateNoteCard(props: UpdateNoteCardProps) {

    const [updatedNote, setUpdatedNote] = useState<Note>(props.note);


    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setUpdatedNote((prevState) => ({
            ...prevState,
            [name]: type === "checkbox"
                ? checked
                : type === "number"
                    ? +value // Преобразуем строку в число
                    : value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.save(updatedNote);
        props.onReadOnlyChange();
    };

    return (
        <form className="note-card">
            <div className="note-card-header">
                <input
                    type="text"
                    name="vacancy"
                    value={updatedNote.vacancy}
                    onChange={handleChange}
                    className="note-card-update-input"
                    required
                />

                <input
                    type="number"
                    name="zp"
                    value={updatedNote.zp}
                    onChange={handleChange}
                    className="note-card-update-input"
                    required
                />

            </div>
            <div>
                <input
                    type="text"
                    name="company"
                    value={updatedNote.company}
                    onChange={handleChange}
                    className="note-card-update-input"
                    required
                />

                <textarea
                    name="description"
                    value={updatedNote.description}
                    onChange={handleChange}
                    className="note-card-update-input"
                    required
                />
            </div>
            <div className="note-card-footer">
                <label>
                    <input
                        type="checkbox"
                        name="status"
                        checked={updatedNote.status}
                        onChange={handleChange}
                        required
                    />
                    Активно
                </label>

                <div>
                    <Button title={"Save"} onClick={(e) => handleSubmit(e)}/>
                    <Button title={"Cancel"} onClick={() => props.onReadOnlyChange()}/>
                </div>
            </div>
        </form>
)
}


type NoteCardProps = {
    note: Note;
}

function NoteCard(props: NoteCardProps) {

    const queryClient = useQueryClient();

    const deleteNoteMutation = useMutation({
        mutationFn: (id: string) => service.deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['getNotes']})
        }
    })

    const updateNoteMutation = useMutation({
        mutationFn: (note: Note) => service.updateNote(note),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['getNotes']})
        }
    })

    const [isReadOnly, setIsReadOnly] = useState<boolean>(true)

    return (
        isReadOnly ? (
            <DefaultNoteCard
                note={props.note}
                onReadOnlyChange={() => setIsReadOnly(false)}
                delete={() => deleteNoteMutation.mutate(props.note.id)}
            />
        ) : (
            <UpdateNoteCard
                note={props.note}
                onReadOnlyChange={() => setIsReadOnly(true)}
                save={(note) => updateNoteMutation.mutate(note)}
            />
        )
    );
}

export default NoteCard