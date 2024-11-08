import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDtoDeleteCategory {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;
}
