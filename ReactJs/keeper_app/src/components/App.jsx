import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateNote from "./CreateNote";
import Note from "./Note";
import starterNotes from "../notes";

function App() {
    
    const [notes, setNotes] = useState(starterNotes);

    function addNote(note) {
        setNotes(prevNotes => [...prevNotes, { key: prevNotes.length, ...note } ]);
    }

    function deleteNote(id) {

        setNotes((prevNotes) => {
            return prevNotes.filter((note, index) => { return (index !== id) });
        })
    }

    return (
        <div>
            <Header />
            <CreateNote onAdd={addNote} />
            {notes.map((note, index) => {
                return <Note key={index} id={index} title={note.title} content={note.content} onDelete={deleteNote} />
            })}
            <Footer />
        </div>
    );
}

export default App;