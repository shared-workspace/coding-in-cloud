import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDtoDeleteImageGroup {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;
}
