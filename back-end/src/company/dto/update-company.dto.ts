import { ApiProperty } from '@nestjs/swagger';

export class RequestDtoUpdateCompany {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  categories: string[];

  @ApiProperty()
  features: string[];

  @ApiProperty()
  imageGroups: string[];
}
