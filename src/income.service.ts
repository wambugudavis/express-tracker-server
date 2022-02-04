import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Income, Prisma } from '@prisma/client';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  async income(
    incomeWhereUniqueInput: Prisma.IncomeWhereUniqueInput,
  ): Promise<Income | null> {
    return this.prisma.income.findUnique({
      where: incomeWhereUniqueInput,
    });
  }

  async incomes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IncomeWhereUniqueInput;
    where?: Prisma.IncomeWhereInput;
    orderBy?: Prisma.IncomeOrderByWithRelationInput;
  }): Promise<Income[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.income.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createIncome(data: Prisma.IncomeCreateInput): Promise<Income> {
    return this.prisma.income.create({
      data,
    });
  }

  async updateIncome(params: {
    where: Prisma.IncomeWhereUniqueInput;
    data: Prisma.IncomeUpdateInput;
  }): Promise<Income> {
    const { data, where } = params;
    return this.prisma.income.update({
      data,
      where,
    });
  }

  async deleteIncome(where: Prisma.IncomeWhereUniqueInput): Promise<Income> {
    return this.prisma.income.delete({
      where,
    });
  }
}
