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

  async getFeatures() {
    return await this.featureModel.find();
  }

  async createFeature(name: string) {
    return await this.featureModel.create({ name });
  }

  async updateFeature(_id: any, filters: string[]) {
    return await this.featureModel.updateOne({ _id }, { filters });
  }

  async deleteFeature(_id: any) {
    return (await this.featureModel.deleteOne({ _id })).acknowledged;
  }
}
