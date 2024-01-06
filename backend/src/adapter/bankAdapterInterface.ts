export interface BankAdapterInterface {
  doTransaction(mailToDebit: string, amount: number): Promise<number>
}