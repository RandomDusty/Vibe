import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose'
import {Album} from "../../album/schemas/album.shema";


export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop()
    listen: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Album'})
    album: null | Album;
}

export const TrackSchema = SchemaFactory.createForClass(Track);