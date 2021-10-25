import { Controller, Get } from '@nestjs/common';

@Controller('transactions')
export class TransactionsController {

  @Get()
  findAll() {
    return 'This is transactions endpoint';
  }

}
