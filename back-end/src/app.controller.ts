import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  // ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';

class CompanyOptions {
  @ApiProperty()
  names: string[];
  @ApiProperty()
  category: string[];
}

class FeatureOptions {
  @ApiProperty()
  name: string;
  @ApiProperty()
  filterCount: number;
  @ApiProperty()
  imageGroupCount: number;
}

class FilterOptions {
  @ApiProperty()
  name: string;
  @ApiProperty()
  imageGroupCount: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('user')
  // @ApiOkResponse({ type: [String] })
  // getUser(@Query('name') name: string, @Query('age') age: number): string {
  //   return 'User ' + name + ' is ' + age + ' years old';
  // }

  // @Post('user/:name/:age')
  // // @ApiOkResponse({ type: UserPostDto })
  // @ApiCreatedResponse({ type: UserPostDto })
  // postUser(
  //   @Param('name') name: string,
  //   @Param('age') age: number,
  // ): { name: string; age: number } {
  //   return { name, age };
  // }

  // @Get('null')
  // @ApiResponse({ status: 200, type: null })
  // getNull(): string {
  //   return null;
  // }
  @Get('company-options')
  @ApiOkResponse({ type: CompanyOptions })
  getCompanyNameList(): CompanyOptions {
    return {
      names: ['Apple', 'Google', 'Microsoft'],
      category: [
        'Technology',
        'Innovation',
        'Search',
        'Ads',
        'Software',
        'Hardware',
      ],
    };
  }

  @Get('category-options')
  @ApiOkResponse({ type: [Number] })
  getCompanyCategoryList(@Query('company') company: string): number[] {
    switch (company) {
      case 'Apple':
        return [0, 1];
      case 'Google':
        return [2, 3];
      case 'Microsoft':
        return [4, 5];
      default:
        return [];
    }
  }

  @Get('feature-options')
  @ApiOkResponse({ type: [FeatureOptions] })
  getCompanyFeatureList(@Query('company') company: string) {
    // switch (company) {
    //   case 'Apple':
    //     return ['iOS', 'macOS', 'iPhone', 'iPad'];
    //   case 'Google':
    //     return ['Google Search', 'Google Maps', 'Google Ads', 'Google AdSense'];
    //   case 'Microsoft':
    //     return ['Windows', 'Office', 'Surface', 'Xbox'];
    //   default:
    //     return [];
    // }
    switch (company) {
      case 'Apple':
        return [
          { name: 'iOS', filterCount: 2, imageGroupCount: 3 },
          { name: 'macOS', filterCount: 2, imageGroupCount: 3 },
          { name: 'iPhone', filterCount: 2, imageGroupCount: 3 },
          { name: 'iPad', filterCount: 2, imageGroupCount: 3 },
        ];
      case 'Google':
        return [
          { name: 'Google Search', filterCount: 2, imageGroupCount: 3 },
          { name: 'Google Maps', filterCount: 2, imageGroupCount: 3 },
          { name: 'Google Ads', filterCount: 2, imageGroupCount: 3 },
          { name: 'Google AdSense', filterCount: 2, imageGroupCount: 3 },
        ];
      case 'Microsoft':
        return [
          { name: 'Windows', filterCount: 2, imageGroupCount: 3 },
          { name: 'Office', filterCount: 2, imageGroupCount: 3 },
          { name: 'Surface', filterCount: 2, imageGroupCount: 3 },
          { name: 'Xbox', filterCount: 2, imageGroupCount: 3 },
        ];
      default:
        return [];
    }
  }

  @Get('filter-options')
  @ApiOkResponse({ type: [FilterOptions] })
  getCompanyFilterList(
    @Query('company') company: string,
    @Query('feature') feature: string,
  ) {
    switch (company) {
      case 'Apple':
        switch (feature) {
          case 'iOS':
            return [
              { name: 'iPhone', imageGroupCount: 3 },
              { name: 'iPad', imageGroupCount: 3 },
            ];
          case 'macOS':
            return [
              { name: 'MacBook', imageGroupCount: 3 },
              { name: 'iMac', imageGroupCount: 3 },
            ];
          case 'iPhone':
            return [
              { name: 'iPhone 12', imageGroupCount: 3 },
              { name: 'iPhone 12 Pro', imageGroupCount: 3 },
            ];
          case 'iPad':
            return [
              { name: 'iPad Pro', imageGroupCount: 3 },
              { name: 'iPad Air', imageGroupCount: 3 },
            ];
          default:
            return [];
        }
      case 'Google':
        switch (feature) {
          case 'Google Search':
            return [
              { name: 'Web', imageGroupCount: 3 },
              { name: 'Images', imageGroupCount: 3 },
            ];
          case 'Google Maps':
            return [
              { name: 'Map', imageGroupCount: 3 },
              { name: 'Street View', imageGroupCount: 3 },
            ];
          case 'Google Ads':
            return [
              { name: 'Search Ads', imageGroupCount: 3 },
              { name: 'Display Ads', imageGroupCount: 3 },
            ];
          case 'Google AdSense':
            return [
              { name: 'AdSense for Content', imageGroupCount: 3 },
              { name: 'AdSense for Search', imageGroupCount: 3 },
            ];
          default:
            return [];
        }
      case 'Microsoft':
        switch (feature) {
          case 'Windows':
            return [
              { name: 'Windows 10', imageGroupCount: 3 },
              { name: 'Windows 11', imageGroupCount: 3 },
            ];
          case 'Office':
            return [
              { name: 'Office 365', imageGroupCount: 3 },
              { name: 'Office 2021', imageGroupCount: 3 },
            ];
          case 'Surface':
            return [
              { name: 'Surface Pro', imageGroupCount: 3 },
              { name: 'Surface Laptop', imageGroupCount: 3 },
            ];
          case 'Xbox':
            return [
              { name: 'Xbox Series X', imageGroupCount: 3 },
              { name: 'Xbox Series S', imageGroupCount: 3 },
            ];
          default:
            return [];
        }
      default:
        return [];
    }
  }
}
