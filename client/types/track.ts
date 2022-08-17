export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
}

export interface TrackState {
    tracks: ITrack[];
    error: string;
    count: number;
    offset: number;
}

export enum TrackActionType {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
    SET_COUNT = 'SET_COUNT',
    SET_OFFSET= 'SET_OFFSET'
}

interface FetchTrackAction {
    type: TrackActionType.FETCH_TRACKS,
    payload: ITrack[]
}

interface FetchTrackErrorAction {
    type: TrackActionType.FETCH_TRACKS_ERROR,
    payload: string
}

interface SetCount {
    type: TrackActionType.SET_COUNT,
    payload: number
}

interface SetOffset {
    type: TrackActionType.SET_OFFSET,
    payload: number
}

export type TrackAction = FetchTrackAction
    | FetchTrackErrorAction
    | SetCount
    | SetOffset