import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageGroup } from './schema/image-group.schema';
import { Feature } from 'src/feature/schema/feature.schema';

@Injectable()
export class ImageGroupService {
  constructor(
    @InjectModel('ImageGroup')
    private readonly imageGroupModel: Model<ImageGroup>,
    @InjectModel('Feature')
    private readonly featureModel: Model<Feature>,
  ) {}

  async createImageGroup(data: any) {
    const { feature, filter } = data;
    if (filter) {
      const res = await this.featureModel.findOne({ name: feature });
      if (!res || !res.filters.includes(filter)) {
        throw new BadRequestException('Invalid filter');
      }
    }
    const res = await this.imageGroupModel.create(data);
    if (res && res._id) {
      return {
        success: true,
        message: 'ImageGroup created successfully',
        data: res,
      };
    } else {
      return { success: false, message: 'ImageGroup not created' };
    }
  }

  async deleteImageGroup(_id: any) {
    const res = await this.imageGroupModel.deleteOne({ _id });
    if (res.acknowledged && res.deletedCount) {
      return {
        success: true,
        message: 'ImageGroup deleted successfully',
      };
    } else {
      return { success: false, message: 'ImageGroup not deleted' };
    }
  }
}
