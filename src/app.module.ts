import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './features/users/users.module';
import { JournalsModule } from './features/journals/journals.module';
import { TransactionsModule } from './features/transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    UsersModule,
    JournalsModule,
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: "mongodb+srv://daniel-mongo:daniel-mongo@clustermongots.arefo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      useUnifiedTopology: true
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }