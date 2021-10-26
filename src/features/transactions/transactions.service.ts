import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Transaction } from 'src/entity/transaction.entity';
import { ITransaction } from 'src/interface/transaction.interface';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transRepository: MongoRepository<Transaction>
  ) { }

  async findAll(): Promise<Transaction[]> {
    const transactions = this.transRepository.find();
    return transactions;
  }

  async findById(id: string): Promise<Transaction> {
    const transaction = ObjectId.isValid(id) && this.transRepository.findOne(id);
    if (!transaction) {
      throw new NotFoundException('Data tidak ditemukan');
    }
    return transaction;
  }

  async create(transObject: ITransaction): Promise<Transaction> {
    const transaction = this.transRepository.save(transObject);
    return transaction;
  }

  async update(id: string, transObject: ITransaction): Promise<Transaction> {
    const transaction = ObjectId.isValid(id) && this.transRepository.findOne(id);
    if (!transaction) {
      throw new NotFoundException('Data yang ingin Anda ubah tidak ditemukan');
    }
    this.transRepository.update(id, transObject);
    return transaction;
  }

  async delete(id: string): Promise<Transaction> {
    const transaction = ObjectId.isValid(id) && this.transRepository.findOne(id);
    if (!transaction) {
      throw new NotFoundException('Data yang ingin Anda hapus tidak ditemukan');
    }
    this.transRepository.delete(id);
    return transaction;
  }

}
