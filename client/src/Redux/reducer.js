import { GET_GENRES, GET_VIDEOGAMES } from "./actions-types";

const initialState = {
    videoGames: [],
    videogamesDetail: {},
    genres: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type){
        case GET_VIDEOGAMES:
            return {
                ...state,
                videoGames: payload
            }
        
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }
            
        default:
            return {...state}
    }
}

export default reducer;
