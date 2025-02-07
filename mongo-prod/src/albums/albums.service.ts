import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './schema/album.schema';
import { Model } from 'mongoose';
import { Song } from 'src/songs/schemas/song';
import { CreateAlbumDTO } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<AlbumDocument>,
  ) {}

  async createAlbum(createAlbumDTO: CreateAlbumDTO): Promise<Album> {
    return this.albumModel.create(createAlbumDTO);
  }

  async findAlbums(): Promise<Album[]> {
    return this.albumModel.find().populate('songs', null, Song.name);
  }
}
