// import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Details.css'

function Details(){

    const movie = useSelector(store =>store.selectedMovie)

    return(
        <div className="big-card">
            <img src={movie.poster} alt={movie.title}/>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
        </div>
    )
}
export default Details;