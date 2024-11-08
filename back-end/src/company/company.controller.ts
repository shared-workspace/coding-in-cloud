import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { RequestDtoCreateCompany } from './dto/create-company.dto';
import { RequestDtoDeleteCompany } from './dto/delete-company.dto';
import { RequestDtoUpdateCompany } from './dto/update-company.dto';
import { ResponseDtoCompany } from './schema/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOkResponse({ type: RequestDtoCreateCompany })
  async createCompany(@Body() company: RequestDtoCreateCompany) {
    console.log('company', company);
    return await this.companyService.createCompany(company);
  }

  @Put()
  @ApiOkResponse({ type: ResponseDtoCompany })
  async updateCompany(@Body() company: RequestDtoUpdateCompany) {
    console.log('company', company);
    return await this.companyService.updateCompany(company._id, company);
  }

  @Delete()
  @ApiOkResponse({ type: ResponseDtoCompany })
  async deleteCompany(@Body() company: RequestDtoDeleteCompany) {
    console.log('company', company);
    return await this.companyService.deleteCompany(company._id);
  }
}
