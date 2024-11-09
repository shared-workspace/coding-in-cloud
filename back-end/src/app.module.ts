import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { CategoryModule } from './category/category.module';
import { FeatureModule } from './feature/feature.module';
import { ImageGroupModule } from './image-group/image-group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CompanyModule,
    CategoryModule,
    FeatureModule,
    ImageGroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
