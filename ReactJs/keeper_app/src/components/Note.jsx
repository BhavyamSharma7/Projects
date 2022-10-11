import React from 'react';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {

    function handleClick() {
        props.onDelete(props.id);
    }

    return (
        <div className='note'>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <Fab onClick={handleClick}><DeleteIcon /></Fab>
        </div>
    );
}

export default Note;