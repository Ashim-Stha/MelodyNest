import { Module } from '@nestjs/common';
import { AlbumService } from './albums.service';
import { AlbumController } from './albums.controller';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
