import { Controller, Post, Body } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }
}
