import { Module } from '@nestjs/common';
import { SongController } from './songs.controller';
import { SongService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { SongResolver } from './song.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongController],
  providers: [SongService, SongResolver],
})
export class SongModule {}
