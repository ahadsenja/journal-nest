export class TransactionDTO {
  id: string;
  date: Date;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  journalId: string;
}