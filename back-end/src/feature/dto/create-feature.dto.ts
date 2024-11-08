import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDtoCreateFeature {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
