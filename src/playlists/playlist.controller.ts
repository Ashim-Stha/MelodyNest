import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlists')
@ApiTags('playlists')
export class PlaylistController {
  constructor(private playListService: PlaylistService) {}

  @Post()
  create(@Body() playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
