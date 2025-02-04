import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';

@Injectable({
  // scope: Scope.TRANSIENT, //create a new dedicated instance of SongsController on every incoming req - doesnot cache
})
export class SongsService {
  constructor(private songsRepository: Repository<Song>) {}
  private readonly songs = [];

  create(song) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // throw new Error('Error in DB while fetching record');
    return this.songs;
  }
}
