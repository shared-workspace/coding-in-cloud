import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feature } from '../schema/feature.schema';

@Injectable()
export class ValidateFilterPipe implements PipeTransform {
  constructor(
    @InjectModel('Feature')
    private readonly featureModel: Model<Feature>,
  ) {}

  async transform(value: any) {
    const { feature, filter } = value;
    if (!filter) return value;
    const res = await this.featureModel.findOne({ name: feature });
    if (!res || !res.filters.includes(filter)) {
      throw new BadRequestException('Invalid filter');
    }
    return value;
  }
}
