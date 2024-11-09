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

  @ApiProperty({ type: [Category] })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], default: [] })
  categories: Category[];

  @ApiProperty({ type: [Feature] })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Feature' }], default: [] })
  features: Feature[];

  @ApiProperty({ type: [ImageGroup] })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'ImageGroup' }], default: [] })
  imageGroups: ImageGroup[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
