import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class CreateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  songs: string[];
}
