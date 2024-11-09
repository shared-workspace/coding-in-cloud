import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FeatureService } from './feature.service';
import { RequestDtoCreateFeature } from './dto/create-feature.dto';
import { RequestDtoDeleteFeature } from './dto/delete-feature.dto';
import { RequestDtoUpdateFeature } from './dto/update-feature.dto';
import { Feature } from './schema/feature.schema';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Get('all')
  @ApiOkResponse({ type: [Feature] })
  async getFeatures() {
    return await this.featureService.getFeatures();
  }

  @Post()
  @ApiCreatedResponse({ type: Feature })
  async createFeature(@Body() feature: RequestDtoCreateFeature) {
    console.log('feature', feature);
    return await this.featureService.createFeature(feature.name);
  }

  @Put()
  @ApiAcceptedResponse({ type: Feature })
  async updateFeature(@Body() feature: RequestDtoUpdateFeature) {
    console.log('feature', feature);
    return await this.featureService.updateFeature(
      feature._id,
      feature.filters,
    );
  }

  @Delete()
  @ApiOkResponse({ type: Boolean })
  async deleteFeature(@Body() feature: RequestDtoDeleteFeature) {
    console.log('feature', feature);
    return await this.featureService.deleteFeature(feature._id);
  }
}
