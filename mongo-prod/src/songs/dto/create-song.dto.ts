import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  duration: Date;

  @IsString()
  @IsOptional()
  lyrics: string;

  @IsString()
  @IsOptional()
  album: string;
}
