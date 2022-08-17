import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "../track/schemas/track.shema";
import {Model, ObjectId} from "mongoose";
import {Album, AlbumDocument} from "./schemas/album.shema";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {FileService, FileType} from "../file/file.service";


@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
                @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                private fileService: FileService) {}

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const album = await this.albumModel.create({...dto, listens: 0, picture: picturePath});
        return album;
    }

    async getAll(count = 10, offset = 0): Promise<Album[]> {
        const albums = await this.albumModel.find().skip(+offset).limit(+count);
        return albums;
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.albumModel.findById(id).populate('tracks');
        return album;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const album = await this.albumModel.findByIdAndDelete(id);
        return album._id;
    }

    async addTrack(id: ObjectId){
        const track = await this.trackModel.findById(id);
        if(track.album) {
            const album = await this.albumModel.findById(track.album);
            album.tracks.push(track._id);
            await album.save();
        }

    }
}