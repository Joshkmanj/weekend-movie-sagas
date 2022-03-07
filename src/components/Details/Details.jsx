// import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Details.css'

function Details(){

    const movie = useSelector(store =>store.selectedMovie)
    const history = useHistory()


    const handleClick = () =>{
        history.push('/') // On click of return button, this brings the user to the home page
    }

    return(
        <div className="big-card">
            <img src={movie.poster} alt={movie.title}/>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <div className='tag-holder'>
            {(movie.genres).map(genre =>(
                <p
                key={genre.name} 
                className='genre-tag'>{genre.name}</p>
                ))}
            </div>
            <button
            onClick={handleClick}
            >return</button>
        </div>
    )
}
export default Details;