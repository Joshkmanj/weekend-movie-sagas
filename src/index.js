import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
//------------<  END IMPORTS  >--------------------------------

// Create the rootSaga generator function----------------------
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
}
//-------------------------------------------------------------


//---------<  S A G A S  >-----------------------------------------------------------------
function* fetchAllMovies() {
    // get all movies from the DB
    console.log('fetchAllMovies: getting movies from database (1/2)');
    try {
        const movies = yield axios.get('/api/movie');
        console.log('fetchAllMovies: response from server (2/2):', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('fetchAllMovies: Error retrieving movies (2/2)');
    }

}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();
//---------<//  E N D   S A G A S  >--------------------------------------------------------



// --------------<  R E D U C E R S  >------------------------------------------------------
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
// --------------<// E N D   R E D U C E R S  >-------------------------------------------

// --------------<  R E D U X  S T O R E /   >--------------------------
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
    );
    
    // Pass rootSaga into our sagaMiddleware
    sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
