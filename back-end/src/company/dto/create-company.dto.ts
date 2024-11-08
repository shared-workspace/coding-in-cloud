import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDtoCreateCompany {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
