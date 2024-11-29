import './App.css'
import { useState} from "react";
import NoteList from "./note/component/note-list/NoteList.tsx";
import Modal from "./modal/Modal.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  return (
    <QueryClientProvider client={queryClient}>
        <NoteList/>
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}/>
        <button onClick={() => setIsOpenModal(true)} className="create-btn">+</button>
    </QueryClientProvider>
  )
}

export default App
