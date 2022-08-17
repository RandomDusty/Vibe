import {TrackAction, TrackActionType, TrackState} from "../../types/track";

const initialState: TrackState = {
    tracks: [],
    error: '',
    count: 10,
    offset: 0
}


export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type){
        case TrackActionType.FETCH_TRACKS :
            return {...state, error: '', tracks: action.payload}
        case TrackActionType.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionType.SET_COUNT:
            return {...state, count: action.payload}
        case TrackActionType.SET_OFFSET:
            return {...state, offset: action.payload}
        default:
            return state
    }
}