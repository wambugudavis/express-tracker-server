import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryService } from './category.service';
import { SubCategoryService } from './sub-category.service';
import { IncomeService } from './income.service';
import { ExpenseService } from './expense.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    CategoryService,
    SubCategoryService,
    IncomeService,
    ExpenseService,
  ],
})
export class AppModule {}
