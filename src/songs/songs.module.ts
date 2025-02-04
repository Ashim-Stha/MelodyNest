import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';

const mockSongsService = {
  findAll() {
    return [{ id: 1, title: 'Lasting lover', artists: ['luffy'] }];
  },
  create(song) {
    return [{ id: 1, title: 'Lasting lover' }, song];
  },
};

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    // SongsService
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },

    //  //mock
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService,
    // },

    // //custom provider
    SongsService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
