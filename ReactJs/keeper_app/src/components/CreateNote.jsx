import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

function CreateNote(props) {

    const [isExpanded, setExpanded] = useState(false);
    const [note, updateNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        updateNote((prevNote) => {
            
            return {
                ...prevNote,
                [name]: value
            }

        });
    }

    function submitNote(event) {
        props.onAdd(note);
        updateNote({
            title: "",
            content: ""
        })

        event.preventDefault();
    }

    function expand() {
        setExpanded(true);
    }

    return (
        <div>
            <form className="create-note">
                {isExpanded ? <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                /> : null}
                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Write Something here..."
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}><Fab onClick={submitNote}><AddIcon /></Fab></Zoom>
            </form>
        </div>
    );
}

export default CreateNote;