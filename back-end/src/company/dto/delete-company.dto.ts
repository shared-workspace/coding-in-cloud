import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDtoDeleteCompany {
  @ApiProperty()
  @IsNotEmpty()
  _id: string;
}
