import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feature } from './schema/feature.schema';

@Injectable()
export class FeatureService {
  constructor(
    @InjectModel('Feature')
    private readonly featureModel: Model<Feature>,
  ) {}

  async createFeature(name: string) {
    const res = await this.featureModel.create({ name });
    if (res && res._id) {
      return {
        success: true,
        message: 'Feature created successfully',
        data: res,
      };
    } else {
      return { success: false, message: 'Feature not created' };
    }
  }

  async updateFeature(_id: any, filters: string[]) {
    const res = await this.featureModel.updateOne({ _id }, { filters });
    if (res.acknowledged) {
      return {
        success: true,
        message: 'Feature updated successfully',
        data: res,
      };
    } else {
      return { success: false, message: 'Feature not updated' };
    }
  }

  async deleteFeature(_id: any) {
    const res = await this.featureModel.deleteOne({ _id });
    if (res.acknowledged && res.deletedCount) {
      return {
        success: true,
        message: 'Feature deleted successfully',
      };
    } else {
      return { success: false, message: 'Feature not deleted' };
    }
  }
}
