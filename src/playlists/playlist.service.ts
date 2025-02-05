import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepository: Repository<Song>,

    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlaylistDTO): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;

    const songs = await this.songsRepository.findByIds(playListDTO.songs);
    playList.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playListDTO.user });
    playList.user = user;

    return this.playlistRepository.save(playList);
  }
}
