import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {ObjectId} from "mongoose";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {FileService} from "../file/file.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateTrackDto} from "../track/dto/create-track.dto";

@Controller('/albums')
export class AlbumController{
    constructor(private albumService: AlbumService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
        create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files;
        return this.albumService.create(dto, picture[0]);
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return  this.albumService.getAll(count, offset);
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return  this.albumService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }

    @Post('/addTrack/:id')
    addTrack(@Param('id') id: ObjectId) {
        return this.albumService.addTrack(id);
    }
}