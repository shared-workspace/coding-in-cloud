import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RequestDtoCreateCompany } from './dto/create-company.dto';
import { RequestDtoUpdateCompany } from './dto/update-company.dto';
import { Company } from './schema/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('all')
  @ApiOkResponse({ type: [Company] })
  async getCompanies() {
    return await this.companyService.getCompanies();
  }

  @Post()
  @ApiCreatedResponse({ type: Company })
  async createCompany(@Body() company: RequestDtoCreateCompany) {
    console.log('company', company);
    return await this.companyService.createCompany(company);
  }

  @Put()
  @ApiAcceptedResponse({ type: Company })
  async updateCompany(@Body() company: RequestDtoUpdateCompany) {
    console.log('company', company);
    return await this.companyService.updateCompany(company._id, company);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: Number })
  async deleteCompany(@Param('id') id: string) {
    console.log('delete company - id', id);
    return await this.companyService.deleteCompany(id);
  }
}
