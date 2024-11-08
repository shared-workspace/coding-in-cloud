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

  async createCompany(company: any) {
    const res = await this.companyModel.create(company);
    if (res && res._id) {
      return {
        success: true,
        message: 'Company created successfully',
        data: res,
      };
    } else {
      return { success: false, message: 'Company not created' };
    }
  }

  async deleteCompany(_id: any) {
    const res = await this.companyModel.deleteOne({ _id });
    if (res.acknowledged && res.deletedCount) {
      return {
        success: true,
        message: 'Company deleted successfully',
      };
    } else {
      return { success: false, message: 'Company not deleted' };
    }
  }

  async updateCompany(_id: any, data: any) {
    const res = await this.companyModel.updateOne({ _id }, data);
    if (res.acknowledged) {
      return {
        success: true,
        message: 'Company updated successfully',
        data: res,
      };
    } else {
      return { success: false, message: 'Company not updated' };
    }
  }
}
