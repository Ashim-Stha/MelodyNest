import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT, //create a new dedicated instance of SongsController on every incoming req - doesnot cache
})
export class SongsService {
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
