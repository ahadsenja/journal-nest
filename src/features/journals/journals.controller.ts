import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { JournalDTO } from 'src/dto/journal.dto';
import { Journal } from 'src/entity/journal.entity';
import { JournalsService } from './journals.service';

@Controller('api/v1/')
export class JournalsController {

  constructor(private journalService: JournalsService) { }

  // Find all journals
  @UseGuards(JwtAuthGuard)
  @Get('journals')
  async findAll(@Res() res: Response): Promise<Journal[]> {
    const journals = await this.journalService.findAll();
    res.send({
      data: journals
    })
    return;
  }

  // Find journal by id
  @UseGuards(JwtAuthGuard)
  @Get('journals/:id')
  async GetById(@Param('id') id: string, @Res() res: Response): Promise<Journal> {
    const journal = await this.journalService.findById(id);
    res.send({
      data: journal
    });
    return;
  }

  // Create new journal
  @UseGuards(JwtAuthGuard)
  @Post('journals')
  async createJournal(@Body() payload: JournalDTO, @Res() res: Response): Promise<Journal> {
    const journal = await this.journalService.create(payload);
    res.send({
      data: journal
    });
    return;
  }

  // Update journal
  @UseGuards(JwtAuthGuard)
  @Put('journals/:id')
  async updateJournal(@Param('id') id: string, @Body() payload: JournalDTO, @Res() res: Response): Promise<Journal> {
    const journal = await this.journalService.update(id, payload);
    res.send({
      data: journal
    });
    return;
  }

  // Delete journal
  @UseGuards(JwtAuthGuard)
  @Delete('journals/:id')
  async deleteJournal(@Param('id') id: string, @Res() res: Response): Promise<Journal> {
    const journal = await this.journalService.delete(id);
    res.send({
      data: journal
    });
    return;
  }

}
