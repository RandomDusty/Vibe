import {PlayerAction, PlayerActionTypes, PlayerState} from "../../types/player";

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true,
    prevActive: null,
    playlist: null,
    nextPlaylist: null
}

export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case PlayerActionTypes.PLAY:
            return {...state, pause: false}
        case PlayerActionTypes.PAUSE:
            return {...state, pause: true}
        case PlayerActionTypes.SET_ACTIVE:
            return {...state, active: action.payload, duration: 0, currentTime: 0}
        case PlayerActionTypes.SET_DURATION:
            return {...state, duration: action.payload}
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case PlayerActionTypes.SET_VOLUME:
            return {...state, volume: action.payload}
        case PlayerActionTypes.SET_PREV_ACTIVE:
            return {...state, prevActive: action.payload}
        case PlayerActionTypes.SET_PLAYLIST:
            return {...state, playlist: action.payload}
        case PlayerActionTypes.SET_NEXT_PLAYLIST:
            return {...state, nextPlaylist: action.payload}
        default:
            return state
    }

}
