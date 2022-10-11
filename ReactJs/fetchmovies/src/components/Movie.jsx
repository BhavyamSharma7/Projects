import React from "react";


function Movie(props) {

    return (
        <div id="movie-details">
            <h3>{props.title}</h3>
            <h5>{props.opening}</h5>
            <p>{props.release_date}</p>
        </div>
    );

}

export default Movie;