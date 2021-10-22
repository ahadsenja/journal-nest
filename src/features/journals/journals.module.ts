import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';

@Module({
  providers: [JournalsService]
})
export class JournalsModule {}
