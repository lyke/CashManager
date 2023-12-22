import * as mysql from 'mysql';

import { AdminsDao } from "../dao/admins.dao";
import { Admin } from "../types/admin";
import { BankAdapter } from '../adapter/bankAdapter'
import { BankController } from '../controllers/bank.controller'

export class BankService {
  private bankAdapter: BankAdapter;

  constructor() {
    this.bankAdapter = new BankAdapter();
  }

  public async createAdmin(clientEmail: string, amount: number) :Promise<number> {
    return this.bankAdapter.doTransaction(clientEmail, amount);
  }
}
