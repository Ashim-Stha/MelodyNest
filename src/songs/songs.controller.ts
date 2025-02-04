import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Inject,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(
      `This is connection string ${this.connection.CONNECTION_STRING}`,
    );
  }
  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetch song on the based on id ${typeof id}`;
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
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }
}
