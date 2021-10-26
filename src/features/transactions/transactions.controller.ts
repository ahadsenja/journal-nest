import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TransactionDTO } from 'src/dto/transaction.dto';
import { Transaction } from 'src/entity/transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {

  constructor(private transService: TransactionsService) { }

  @Get()
  async findAll(): Promise<Transaction[]> {
    const transactions = await this.transService.findAll();
    return transactions;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.transService.findById(id);
    return transaction;
  }

  @Post()
  async createTransaction(@Body() payload: TransactionDTO): Promise<Transaction> {
    const transaction = await this.transService.create(payload);
    return transaction;
  }

  @Put(':id')
  async updateTransaction(@Param('id') id: string, @Body() payload: TransactionDTO): Promise<Transaction> {
    const transaction = await this.transService.update(id, payload);
    return transaction;
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.transService.delete(id);
    return transaction;
  }

}