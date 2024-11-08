import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestDtoSearchCompany {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class ResponseDtoSearchCompany {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  categories: string[];

  @ApiProperty()
  features: string[];
}
