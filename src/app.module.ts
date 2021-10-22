import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersController } from './features/users/users.controller';
import { JournalsController } from './features/journals/journals.controller';
import { TransactionsController } from './features/transactions/transactions.controller';

import { UsersModule } from './features/users/users.module';
import { JournalsModule } from './features/journals/journals.module';
import { TransactionsModule } from './features/transactions/transactions.module';

@Module({
  imports: [TransactionsModule, UsersModule, JournalsModule],
  controllers: [AppController, UsersController, JournalsController, TransactionsController],
  providers: [AppService],
})
export class AppModule { }
