import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { FeatureService } from './feature.service';
import { RequestDtoCreateFeature } from './dto/create-feature.dto';
import { RequestDtoDeleteFeature } from './dto/delete-feature.dto';
import { RequestDtoUpdateFeature } from './dto/update-feature.dto';
import { ResponseDtoFeature } from './schema/feature.schema';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  @ApiOkResponse({ type: RequestDtoCreateFeature })
  async createFeature(@Body() feature: RequestDtoCreateFeature) {
    console.log('feature', feature);
    return await this.featureService.createFeature(feature.name);
  }

  @Put()
  @ApiOkResponse({ type: ResponseDtoFeature })
  async updateFeature(@Body() feature: RequestDtoUpdateFeature) {
    console.log('feature', feature);
    return await this.featureService.updateFeature(
      feature._id,
      feature.filters,
    );
  }

  @Delete()
  @ApiOkResponse({ type: ResponseDtoFeature })
  async deleteFeature(@Body() feature: RequestDtoDeleteFeature) {
    console.log('feature', feature);
    return await this.featureService.deleteFeature(feature._id);
  }
}
