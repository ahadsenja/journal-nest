import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JournalDTO } from 'src/dto/journal.dto';
import { Journal } from 'src/entity/journal.entity';
import { IJournal } from 'src/interface/journal.interface';
import { JournalsService } from './journals.service';

@Controller('journals')
export class JournalsController {

  constructor(private journalService: JournalsService) { }

  @Get()
  async findAll(): Promise<Journal[]> {
    const journals = await this.journalService.findAll();
    return journals;
  }

  @Get(':id')
  async GetById(@Param('id') id: string): Promise<Journal> {
    const journal = await this.journalService.findById(id);
    return journal;
  }

  @Post()
  async createJournal(@Body() payload: JournalDTO): Promise<Journal> {
    const journal = await this.journalService.create(payload);
    return journal;
  }

  @Put(':id')
  async updateJournal(@Param('id') id: string, @Body() payload: JournalDTO): Promise<Journal> {
    const journal = await this.journalService.update(id, payload);
    return journal;
  }

  @Delete(':id')
  async deleteJournal(@Param('id') id: string): Promise<Journal> {
    const journal = await this.journalService.delete(id);
    return journal;
  }

}
