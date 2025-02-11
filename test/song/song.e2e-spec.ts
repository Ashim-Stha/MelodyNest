import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../src/app.module';
import { Song } from '../../src/graphql';
import { SongModule } from '../../src/songs/songs.module';
import { CreateSongDTO } from '../../src/songs/dto/create-song-dto';
import * as request from 'supertest';
import { query } from 'express';

describe('SongResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          username: 'postgres',
          password: 'root',
          database: 'test-graphql',
          port: 5432,
          synchronize: true,
          entities: [Song],
          dropSchema: true,
        }),
        SongModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    const songRepository = app.get('SongRepository');
    await songRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  const createSong = (createSongDTO: CreateSongDTO): Promise<Song> => {
    const song = new Song();
    song.title = createSongDTO.title;
    const songRepo = app.get('SongRepository');
    return songRepo.save(song);
  };

  it('/ GET', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello I am learning Nest.js Fundamentals');
  });

  it('(Query)it should get all songs with song query', async () => {
    const newSong = await createSong({ title: 'Animals' });

    const queryData = {
      query: `query {
            songs {
                id
                title    
            }
        }`,
    };

    const results = await request(app.getHttpServer())
      .post('/graphql')
      .send(queryData);
    expect(results.statusCode).toBe(200);
    expect(results.body).toEqual({ data: { songs: [newSong] } });
  });

  it('(Query) it should get a song by id', async () => {
    const newSong = await createSong({ title: 'Animals' });
    const queryData = {
      query: `query GetSong($id: ID!) {
            song(id: $id){
                title
                id
            }
        }`,
      variables: {
        id: newSong.id,
      },
    };

    const result = await request(app.getHttpServer())
      .post('/graphql')
      .send(queryData)
      .expect(200);
    expect(result.body).toEqual({ data: { song: newSong } });
  });
});
