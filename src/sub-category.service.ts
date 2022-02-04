import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SubCategory, Prisma } from '@prisma/client';

@Injectable()
export class SubCategoryService {
  constructor(private prisma: PrismaService) {}

  async subCategory(
    subCategoryWhereUniqueInput: Prisma.SubCategoryWhereUniqueInput,
  ): Promise<SubCategory | null> {
    return this.prisma.subCategory.findUnique({
      where: subCategoryWhereUniqueInput,
    });
  }

  async subCategories(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SubCategoryWhereUniqueInput;
    where?: Prisma.SubCategoryWhereInput;
    orderBy?: Prisma.SubCategoryOrderByWithRelationInput;
  }): Promise<SubCategory[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.subCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSubCategory(
    data: Prisma.SubCategoryCreateInput,
  ): Promise<SubCategory> {
    return this.prisma.subCategory.create({
      data,
    });
  }

  async updateSubCategory(params: {
    where: Prisma.SubCategoryWhereUniqueInput;
    data: Prisma.SubCategoryUpdateInput;
  }): Promise<SubCategory> {
    const { data, where } = params;
    return this.prisma.subCategory.update({
      data,
      where,
    });
  }

  async deleteSubCategory(
    where: Prisma.SubCategoryWhereUniqueInput,
  ): Promise<SubCategory> {
    return this.prisma.subCategory.delete({
      where,
    });
  }
}
