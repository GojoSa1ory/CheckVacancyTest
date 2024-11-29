import { useState } from "react";
import "./modal.style.css";
import { Note } from "../note/model/note.model.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import service from "../note/service/note.service.ts";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Modal = ({ isOpen, onClose }: ModalProps) => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (note:Note) => service.createNote(note),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['getNotes']})
        }
    })

    const [formData, setFormData] = useState<Note>({
        company: "",
        status: false,
        vacancy: "",
        description: "",
        id: "",
        zp: 0,
    });

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox"
                ? checked
                : type === "number"
                    ? +value
                    : value,
        }));
    };

    // Отправка формы
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(formData)
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                <h2>Добавить вакансию</h2>

                <form onSubmit={handleSubmit}>

                    {/* Название компании */}
                    <div className="form-group">

                        <label>Название компании</label>

                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Название вакансии */}
                    <div className="form-group">

                        <label>Название вакансии</label>

                        <input
                            type="text"
                            name="vacancy"
                            value={formData.vacancy}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Зарплата */}
                    <div className="form-group">

                        <label>Зарплата</label>

                        <input
                            type="number"
                            name="zp"
                            value={formData.zp}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Описание */}
                    <div className="form-group">

                        <label>Описание</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Чекбокс для статуса */}
                    <div className="form-group">

                        <label>

                            <input
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />

                            Активно

                        </label>

                    </div>

                    {/* Кнопки */}
                    <div className="form-actions">

                        <button type="submit" className="submit-btn">
                            Отправить
                        </button>

                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Закрыть
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
