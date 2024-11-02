import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';

class UserPostDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  @ApiOkResponse({ type: String })
  getUser(@Query('name') name: string, @Query('age') age: number): string {
    return 'User ' + name + ' is ' + age + ' years old';
  }

  @Post('user/:name/:age')
  // @ApiOkResponse({ type: UserPostDto })
  @ApiCreatedResponse({ type: UserPostDto })
  postUser(
    @Param('name') name: string,
    @Param('age') age: number,
  ): { name: string; age: number } {
    return { name, age };
  }

  // @Get('null')
  // @ApiResponse({ status: 200, type: null })
  // getNull(): string {
  //   return null;
  // }
}
