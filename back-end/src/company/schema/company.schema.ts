import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { Feature } from 'src/feature/schema/feature.schema';
import { ImageGroup } from 'src/image-group/schema/image-group.schema';

@Schema()
export class Company extends Document {
  @ApiProperty()
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @ApiProperty()
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], default: [] })
  category: Category[];

  @ApiProperty()
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Feature' }], default: [] })
  feature: Feature[];

  @ApiProperty()
  @Prop({ type: [{ type: Types.ObjectId, ref: 'ImageGroup' }], default: [] })
  imageGroup: ImageGroup[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);

export class ResponseDtoCompany {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: Company })
  data: {
    _id: string;
    name: string;
    category: string[];
    feature: string[];
    imageGroup: string[];
  };
}
