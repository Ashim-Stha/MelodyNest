import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

const mockSongsService = {
  findAll() {
    return [{ id: 1, title: 'Lasting lover', artists: ['luffy'] }];
  },
  create(song) {
    return [{ id: 1, title: 'Lasting lover' }, song];
  },
};

@Module({
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
