import { Module } from '@nestjs/common';
import { FeatureController } from './feature.controller';
import { FeatureService } from './feature.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from './schema/feature.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Feature.name,
        schema: FeatureSchema,
      },
    ]),
  ],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}
