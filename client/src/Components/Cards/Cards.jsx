import { getGenres, getVideoGames } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Cards = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoGames())
        dispatch(getGenres())
    }, [])

    return (
        <>
        <h1>Videojuegos</h1>
        </>
    )
}

export default Cards;

