import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Journal } from 'src/entity/journal.entity';
import { JournalDTO } from 'src/dto/journal.dto';
import { IJournal } from 'src/interface/journal.interface';

@Injectable()
export class JournalsService {

  constructor(
    @InjectRepository(Journal)
    private readonly journalRepository: MongoRepository<Journal>
  ) { }

  async findAll(): Promise<Journal[]> {
    const journals = this.journalRepository.find();
    return journals;
  }

  async findById(id: string): Promise<Journal> {
    const journal = ObjectId.isValid(id) && this.journalRepository.findOne(id);
    if (!journal) {
      throw new NotFoundException('Data tidak ditemukan');
    }
    return journal;
  }

  async create(journalObject: IJournal): Promise<Journal> {
    const journal = this.journalRepository.save(journalObject);
    return journal;
  }

  async update(id: string, journalObject: IJournal): Promise<Journal> {
    const journal = ObjectId.isValid(id) && this.journalRepository.findOne(id);
    if (!journal) {
      throw new NotFoundException('Data yang ingin di ubah tidak ditemukan');
    }
    this.journalRepository.update(id, journalObject);
    return journal;
  }

  async delete(id: string): Promise<Journal> {
    const journal = ObjectId.isValid(id) && this.journalRepository.findOne(id);
    if (!journal) {
      throw new NotFoundException('Data tidak ditemukan');
    }
    this.journalRepository.delete(id);
    return journal;
  }

}
