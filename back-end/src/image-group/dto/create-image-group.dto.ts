import { ApiProperty } from '@nestjs/swagger';
import { Image } from '../schema/image-group.schema';
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class RequestDtoCreateImageGroup {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @ArrayNotEmpty({ message: 'Images array must not be empty' })
  images: Image[];

  @ApiProperty()
  @IsNotEmpty()
  company: string;

  @ApiProperty()
  @IsNotEmpty()
  feature: string;

  @ApiProperty()
  filter: string;
}
