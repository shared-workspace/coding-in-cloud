import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDtoDeleteFeature {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;
}
