import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TransactionDTO } from 'src/dto/transaction.dto';
import { Transaction } from 'src/entity/transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('api/v1/')
export class TransactionsController {

  constructor(private transService: TransactionsService) { }

  @UseGuards(JwtAuthGuard)
  @Get('transactions')
  async findAll(@Res() res: Response): Promise<Transaction[]> {
    const transactions = await this.transService.findAll();
    res.send({
      data: transactions
    })
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get('transactions/:id')
  async getById(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.transService.findById(id);
    return transaction;
  }

  @UseGuards(JwtAuthGuard)
  @Post('transactions')
  async createTransaction(@Body() payload: TransactionDTO): Promise<Transaction> {
    const transaction = await this.transService.create(payload);
    return transaction;
  }

  @UseGuards(JwtAuthGuard)
  @Put('transactions/:id')
  async updateTransaction(@Param('id') id: string, @Body() payload: TransactionDTO): Promise<Transaction> {
    const transaction = await this.transService.update(id, payload);
    return transaction;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('transactions/:id')
  async deleteTransaction(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.transService.delete(id);
    return transaction;
  }

}