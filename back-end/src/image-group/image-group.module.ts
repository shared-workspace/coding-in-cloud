import { Module } from '@nestjs/common';
import { ImageGroupController } from './image-group.controller';
import { ImageGroupService } from './image-group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageGroup, ImageGroupSchema } from './schema/image-group.schema';
import { Feature, FeatureSchema } from 'src/feature/schema/feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ImageGroup.name,
        schema: ImageGroupSchema,
      },
      {
        name: Feature.name,
        schema: FeatureSchema,
      },
    ]),
  ],
  controllers: [ImageGroupController],
  providers: [ImageGroupService],
})
export class ImageGroupModule {}
