import {ITrack} from "./track";

export interface IAlbum {
    artist: string;
    name: string;
    picture: string;
    tracks: ITrack[];
    listens: number;
    _id: string;
}


