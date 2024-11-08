import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDtoCreateCategory {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
