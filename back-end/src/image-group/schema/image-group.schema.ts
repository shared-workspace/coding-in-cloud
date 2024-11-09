import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Document, Types } from 'mongoose';

export class Image {
  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  alt: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  size: number;
}

class CompanyName {
  @ApiProperty()
  name: string;
}

class FeatureName {
  @ApiProperty()
  name: string;
}

@Schema()
export class ImageGroup extends Document {
  @ApiProperty()
  @Prop({ default: '' })
  name: string;

  @ApiProperty({ type: CompanyName })
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: FeatureName;

  @ApiProperty({ type: FeatureName })
  @Prop({ type: { type: Types.ObjectId, ref: 'Feature' } })
  feature: FeatureName;

  @ApiProperty()
  @Prop({ type: String })
  filter: string;

  @ApiProperty({ type: [Image] })
  @Prop({
    required: true,
    type: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        size: { type: Number, default: 0 },
      },
    ],
    validate: {
      validator: (value: string[]) => value.length > 0,
      message: 'images cannot be an empty array',
    },
  })
  images: {
    url: string;
    alt: string;
    title: string;
    description: string;
    size: number;
  }[];
}

export const ImageGroupSchema = SchemaFactory.createForClass(ImageGroup);

export class ResponseDtoImageGroup {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: ImageGroup })
  data: {
    _id: string;
    name: string;
    company: string;
    feature: string;
    filter: string;
    images: {
      url: string;
      alt: string;
      title: string;
      description: string;
      size: number;
    }[];
  };
}
