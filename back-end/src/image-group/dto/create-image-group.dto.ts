import { ApiProperty } from '@nestjs/swagger';
import { Image } from '../schema/image-group.schema';
import { ArrayNotEmpty } from 'class-validator';

export class RequestDtoCreateImageGroup {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @ArrayNotEmpty({ message: 'Images array must not be empty' })
  images: Image[];
}
