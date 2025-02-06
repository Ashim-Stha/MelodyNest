import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/DevConfigService';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';
// import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './users/users.module';
import { Playlist } from './playlists/playlist.entity';
import { PlaylistModule } from './playlists/playlist.module';
import { dataSourceOptions } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import configuration from './config/configuration';

const devConfig = { port: 3000 };
const proConfig = { port: 4000 };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development'],
      isGlobal: true,
      load: [configuration],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('DB_HOST'),
    //     port: configService.get<number>('DB_PORT'),
    //     username: configService.get<string>('DB_USERNAME'),
    //     password: configService.get<string>('DB_PASSWORD'),
    //     database: configService.get<string>('DB_NAME'),
    //     entities: [Song, Artist, User, Playlist], //
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    PlaylistModule,
    SongsModule,
    ArtistsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(dataSource: DataSource) {
    console.log('dbName', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); //option 1
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option 2
  }

  // consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option 3
}
