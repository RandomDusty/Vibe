import {Dispatch} from "react";
import {TrackAction, TrackActionType} from "../../types/track";
import axios from "axios";


export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try{
            const response = await axios.get('http://localhost:5000/tracks');
            dispatch({
                type: TrackActionType.FETCH_TRACKS,
                payload: response.data
            })

        } catch (e) {
            dispatch({
                type: TrackActionType.FETCH_TRACKS_ERROR,
                payload: 'Произошла ошибка загрузки треков'
            });
        }
    }
}

export const setCount = (payload: number): TrackAction => {
    return {type: TrackActionType.SET_COUNT, payload: payload}
}

export const setOffset = (payload: number): TrackAction => {
    return {type: TrackActionType.SET_OFFSET, payload: payload}
}