import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty } from 'class-validator';

export class RequestDtoUpdateFeature {
  @ApiProperty()
  _id: string;

  @ApiProperty({ type: [String] })
  @ArrayNotEmpty()
  filters: string[];
}
