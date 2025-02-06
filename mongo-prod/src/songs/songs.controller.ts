import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { Song } from './schemas/song';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  find(): Promise<Song[]> {
    return this.songsService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Song> {
    return this.songsService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.songsService.delete(id);
  }
}
