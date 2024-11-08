import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Feature extends Document {
  @ApiProperty()
  @Prop({ required: true, type: String })
  name: string;

  @ApiProperty()
  @Prop({
    type: [String],
    validate: {
      validator: function (value: string[]) {
        return Array.isArray(value) && new Set(value).size === value.length;
      },
      message: 'Filters array must have unique values',
    },
  })
  filters: string[];
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);

export class ResponseDtoFeature {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: Feature })
  data: {
    _id: string;
    name: string;
    filters: string[];
  };
}
