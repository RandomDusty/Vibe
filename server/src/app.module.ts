import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {AlbumModule} from "./album/album.module";
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path'

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('mongodb+srv://vibeman:vibeman@cluster0.wdotaun.mongodb.net/?retryWrites=true&w=majority'),
        TrackModule,
        AlbumModule,
        FileModule
    ]
})
export class AppModule{}