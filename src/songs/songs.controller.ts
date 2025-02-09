import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('songs')
export class SongController {
  constructor(private songService: SongsService) {}
  @Get()
  getSongs(): Promise<Song[]> {
    return this.songService.getSongs();
  }
  @Get(':id')
  getSong(
    @Param('id')
    id: string,
  ): Promise<Song> {
    return this.songService.getSong(id);
  }

  @Post()
  createSong(
    @Body()
    createSongDTO: CreateSongDTO,
  ): Promise<Song> {
    return this.songService.createSong(createSongDTO);
  }

  @Put(':id')
  updateSong(
    @Param('id')
    id: string,
    @Body()
    updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songService.updateSong(id, updateSongDTO);
  }

  @Delete(':id')
  deleteSong(
    @Param('id')
    id: string,
  ): Promise<DeleteResult> {
    return this.songService.deleteSong(id);
  }
}
