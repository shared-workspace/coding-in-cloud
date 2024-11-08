import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { RequestDtoCreateImageGroup } from './dto/create-image-group.dto';
import { RequestDtoDeleteImageGroup } from './dto/delete-image-group.dto';
import { ImageGroupService } from './image-group.service';
import { ResponseDtoImageGroup } from './schema/image-group.schema';

@Controller('image-group')
export class ImageGroupController {
  constructor(private readonly imageGroupService: ImageGroupService) {}

  @Post()
  @ApiOkResponse({ type: RequestDtoCreateImageGroup })
  async createImageGroup(@Body() imageGroup: RequestDtoCreateImageGroup) {
    console.log('imageGroup', imageGroup);
    return await this.imageGroupService.createImageGroup(imageGroup);
  }

  @Delete()
  @ApiOkResponse({ type: ResponseDtoImageGroup })
  async deleteImageGroup(@Body() imageGroup: RequestDtoDeleteImageGroup) {
    console.log('imageGroup', imageGroup);
    return await this.imageGroupService.deleteImageGroup(imageGroup._id);
  }
}
