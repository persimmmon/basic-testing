// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 999;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 999;
    const withdraw = 1000;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(withdraw)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const lender = getBankAccount(1000);
    const borrower = getBankAccount(1100);
    expect(() => lender.transfer(1500, borrower)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(200);
    account.deposit(100);
    expect(account.getBalance()).toBe(300);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(200);
    account.withdraw(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const lender = getBankAccount(200);
    const borrower = getBankAccount(400);
    lender.transfer(200, borrower);
    expect(lender.getBalance()).toBe(0);
    expect(borrower.getBalance()).toBe(600);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await getBankAccount(200).fetchBalance();
    expect(typeof balance).toBe(balance === null ? 'object' : 'number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(200);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
