import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { SubCategoryService } from './sub-category.service';
import { IncomeService } from './income.service';
import { ExpenseService } from './expense.service';
import { Category as CategoryModel } from '@prisma/client';
import { SubCategory as SubCategoryModel } from '@prisma/client';
import { Income as IncomeModel } from '@prisma/client';
import { Expense as ExpenseModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubCategoryService,
    private readonly incomeService: IncomeService,
    private readonly expenseService: ExpenseService,
  ) {}

  @Get('category/:id')
  async getCategoryById(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoryService.category({ id: Number(id) });
  }

  @Get('categories')
  async getAllCategories(): Promise<CategoryModel[]> {
    return this.categoryService.categories({});
  }

  @Get(':id/categories')
  async getUserCategories(@Param('id') id: string): Promise<CategoryModel[]> {
    return this.categoryService.categories({
      where: { userId: String(id) },
    });
  }

  @Post('category')
  async createCategory(
    @Body() categoryData: { name: string; iconName?: string; userId: string },
  ): Promise<CategoryModel> {
    const { name, iconName, userId } = categoryData;
    return this.categoryService.createCategory({
      name,
      iconName,
      userId,
    });
  }

  @Put('category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryData: { name: string; iconName?: string; userId: string },
  ): Promise<CategoryModel> {
    const { name, iconName } = categoryData;
    return this.categoryService.updateCategory({
      where: { id: Number(id) },
      data: { name, iconName },
    });
  }

  @Delete('category/:id')
  async deleteCategory(@Param('id') id: string): Promise<CategoryModel> {
    return this.categoryService.deleteCategory({ id: Number(id) });
  }

  //sub-categories
  @Get('sub-category/:id')
  async getSubCategoryById(@Param('id') id: string): Promise<SubCategoryModel> {
    return this.subCategoryService.subCategory({ id: Number(id) });
  }

  @Get('sub-categories')
  async getAllSubCategories(): Promise<SubCategoryModel[]> {
    return this.subCategoryService.subCategories({});
  }

  @Get('category/:id/sub-categories')
  async getCategorySubCategories(
    @Param('id') id: string,
  ): Promise<SubCategoryModel[]> {
    return this.subCategoryService.subCategories({
      where: { categoryId: Number(id) },
    });
  }

  @Post('sub-category')
  async createSubCategory(
    @Body() subCategoryData: { name: string; categoryId: number },
  ): Promise<SubCategoryModel> {
    const { name, categoryId } = subCategoryData;
    return this.subCategoryService.createSubCategory({
      name,
      category: {
        connect: { id: categoryId },
      },
    });
  }

  @Put('sub-category/:id')
  async updateSubCategory(
    @Param('id') id: string,
    @Body() categoryData: { name: string },
  ): Promise<SubCategoryModel> {
    const { name } = categoryData;
    return this.subCategoryService.updateSubCategory({
      where: { id: Number(id) },
      data: { name },
    });
  }

  @Delete('sub-category/:id')
  async deleteSubCategory(@Param('id') id: string): Promise<SubCategoryModel> {
    return this.subCategoryService.deleteSubCategory({ id: Number(id) });
  }

  //incomes
  @Get('income/:id')
  async getIncomeById(@Param('id') id: string): Promise<IncomeModel> {
    return this.incomeService.income({ id: Number(id) });
  }

  @Get('incomes')
  async getIncomes(): Promise<IncomeModel[]> {
    return this.incomeService.incomes({});
  }

  @Get(':id/incomes')
  async getUserIncomes(@Param('id') id: string): Promise<IncomeModel[]> {
    return this.incomeService.incomes({
      where: {
        userId: id,
      },
    });
  }

  @Post('income')
  async createIncome(
    @Body()
    incomeData: {
      name: string;
      userId: string;
      iconName: string;
      amount: number;
    },
  ): Promise<IncomeModel> {
    const { name, userId, iconName, amount } = incomeData;
    return this.incomeService.createIncome({
      name,
      userId,
      iconName,
      amount,
    });
  }

  @Put('income/:id')
  async updateIncome(
    @Param('id') id: string,
    @Body()
    incomeData: {
      name: string;
      iconName: string;
      amount: number;
    },
  ): Promise<IncomeModel> {
    const { name, iconName, amount } = incomeData;
    return this.incomeService.updateIncome({
      where: { id: Number(id) },
      data: { name, iconName, amount },
    });
  }

  @Delete('income/:id')
  async deleteIncome(@Param('id') id: string): Promise<IncomeModel> {
    return this.incomeService.deleteIncome({ id: Number(id) });
  }

  //expenses
  @Get('expense/:id')
  async getExpenseById(@Param('id') id: string): Promise<ExpenseModel> {
    return this.expenseService.expense({ id: Number(id) });
  }

  @Get('expenses')
  async getExpenses(): Promise<ExpenseModel[]> {
    return this.expenseService.expenses({});
  }

  @Get(':id/expenses')
  async getUserExpenses(@Param('id') id: string): Promise<ExpenseModel[]> {
    return this.expenseService.expenses({
      where: {
        userId: id,
      },
    });
  }

  @Post('expense')
  async createExpense(
    @Body()
    expenseData: {
      name: string;
      userId: string;
      amount: number;
      date: string | Date;
      currency: string;
      categoryId: number;
      subCategoryId: number;
    },
  ): Promise<ExpenseModel> {
    const { name, userId, categoryId, currency, date, subCategoryId, amount } =
      expenseData;
    return this.expenseService.createExpense({
      name,
      userId,
      amount,
      currency,
      date: new Date(date),
      category: {
        connect: { id: categoryId },
      },
      subCategory: {
        connect: { id: subCategoryId },
      },
    });
  }

  @Put('expense/:id')
  async updateExpense(
    @Param('id') id: string,
    @Body()
    expenseData: {
      name: string;
      userId: string;
      amount: number;
      date: any | Date;
      currency: string;
      categoryId: number;
      subCategoryId: number;
    },
  ): Promise<ExpenseModel> {
    const { name, userId, categoryId, currency, date, subCategoryId, amount } =
      expenseData;
    return this.expenseService.updateExpense({
      where: { id: Number(id) },
      data: {
        name,
        userId,
        amount,
        currency,
        date: new Date(date),
        category: {
          connect: { id: categoryId },
        },
        subCategory: {
          connect: { id: subCategoryId },
        },
      },
    });
  }

  @Delete('expense/:id')
  async deleteExpense(@Param('id') id: string): Promise<ExpenseModel> {
    return this.expenseService.deleteExpense({ id: Number(id) });
  }
}
