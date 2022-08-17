import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./schemas/track.shema";
import {Model, ObjectId} from "mongoose";
import {Album, AlbumDocument} from "../album/schemas/album.shema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {FileService, FileType} from "../file/file.service";


@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
                private fileService: FileService) {}

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        // const EMPTY_ALBUM_ID = await this.albumModel.findById('62ee562bd495f0a71b94a1ef');

        const track = await this.trackModel.create({...dto, listen: 0, audio: audioPath, picture: picturePath});
        if (track.album) {
            const album = await this.albumModel.findById(track.album);
            album.tracks.push(track._id);
            album.save();
        }
        return track;
    }

    async getAll(count = 10, offset = 0): Promise<Track[]> {
        const tracks = await this.trackModel.find().skip(+offset).limit(+count);
        return tracks;
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id);
        return track;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listen += 1;
        track.save();
    }

    async search(query: string): Promise<Track[]>{
        const tracks = await this.trackModel.find({
            name: {$regex: new RegExp(query, 'i')}
        })
        return tracks;
    }

    // async addAlbum(albumId: ObjectId, trackId: ObjectId) {
    //     const track = await this.trackModel.findById(trackId);
    //     const album = await this.albumModel.findById(albumId);
    //     track.album = album._id;
    //     await track.save();
    // }
}