import { Module } from '@nestjs/common';
import { ImageGroupController } from './image-group.controller';
import { ImageGroupService } from './image-group.service';

@Module({
  controllers: [ImageGroupController],
  providers: [ImageGroupService]
})
export class ImageGroupModule {}
