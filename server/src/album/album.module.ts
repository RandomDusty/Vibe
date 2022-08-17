import {Module} from "@nestjs/common";
import {AlbumController} from "./album.controller";
import {AlbumService} from "./album.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Track, TrackSchema} from "../track/schemas/track.shema";
import {Album, AlbumSchema} from "./schemas/album.shema";
import {FileService} from "../file/file.service";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}])
    ],
    controllers: [AlbumController],
    providers: [AlbumService, FileService]
})
export class AlbumModule{}