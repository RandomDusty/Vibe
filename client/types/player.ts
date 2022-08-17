import {ITrack} from "./track";

export interface PlayerState {
    active: null | ITrack;
    playlist: null | ITrack[];
    nextPlaylist: null | ITrack[];
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    prevActive: null | ITrack;
}

export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    SET_ACTIVE = 'SET_ACTIVE',
    SET_DURATION = 'SET_DURATION',
    SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_VOLUME = 'SET_VOLUME',
    SET_PREV_ACTIVE = 'SET_PREV_ACTIVE',
    SET_PLAYLIST = 'SET_PLAYLIST',
    SET_NEXT_PLAYLIST = 'SET_NEXT_PLAYLIST',
}

interface PlayAction {
    type: PlayerActionTypes.PLAY;
}

interface PauseAction {
    type: PlayerActionTypes.PAUSE;
}

interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE;
    payload: ITrack;
}

interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION;
    payload: number;
}

interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME;
    payload: number;
}

interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME;
    payload: number;
}

interface SetPrevActiveAction {
    type: PlayerActionTypes.SET_PREV_ACTIVE;
    payload: ITrack;
}

interface SetPlaylistAction {
    type: PlayerActionTypes.SET_PLAYLIST;
    payload: ITrack[];
}

interface SetNextPlaylistAction {
    type: PlayerActionTypes.SET_NEXT_PLAYLIST;
    payload: ITrack[];
}

export type PlayerAction =
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetCurrentTimeAction
    | SetVolumeAction
    | SetPrevActiveAction
    | SetPlaylistAction
    | SetNextPlaylistAction