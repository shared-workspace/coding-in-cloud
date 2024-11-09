import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './schema/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<Company>,
  ) {}

  async getCompanies() {
    return await this.companyModel.find().populate('categories features');
  }

  async createCompany(company: any) {
    return await this.companyModel.create(company);
  }

  async updateCompany(_id: any, data: any) {
    return await this.companyModel.updateOne({ _id }, data);
  }

  async deleteCompany(_id: any) {
    return (await this.companyModel.deleteOne({ _id })).deletedCount;
  }
}
