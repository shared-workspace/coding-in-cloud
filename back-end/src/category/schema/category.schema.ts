import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true, index: true, type: String })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export class ResponseDtoCategory {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: Category })
  data: {
    _id: string;
    name: string;
  };
}