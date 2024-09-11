import { Controller, Get, Put, Delete, Post } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne() {
    return 'based on id';
  }

  @Put(':id')
  update() {
    return 'update';
  }

  @Delete(':id')
  delete() {
    return 'delete';
  }

  @Post()
  create() {
    return this.songsService.create('Animals by MG');
  }
}
