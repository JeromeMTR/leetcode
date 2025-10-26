// Bank class to manage accounts and process transactions
class Bank {
    // The balances of all accounts (0-based internally)
    private balance: bigint[];

    /**
     * Initializes the Bank with the given balances array.
     * @param balance The balance of each account, 0-indexed.
     */
    constructor(balance: number[]) {
        // Convert all balances to BigInt for safe arithmetic with large numbers
        this.balance = balance.map(v => BigInt(v));
    }

    /**
     * Transfers money from account1 to account2 if valid.
     * @param account1 The source account number (1-based).
     * @param account2 The destination account number (1-based).
     * @param money Money to transfer.
     * @returns True if successful, false otherwise.
     */
    transfer(account1: number, account2: number, money: number): boolean {
        // Check if accounts are valid
        if (!this.isValidAccount(account1) || !this.isValidAccount(account2)) {
            return false;
        }
        const amt = BigInt(money);
        // Check for sufficient balance in account1
        if (this.balance[account1 - 1] < amt) {
            return false;
        }
        // Do the transfer
        this.balance[account1 - 1] -= amt;
        this.balance[account2 - 1] += amt;
        return true;
    }

    /**
     * Deposits money into an account if valid.
     * @param account Account number (1-based).
     * @param money Money to deposit.
     * @returns True if successful, false otherwise.
     */
    deposit(account: number, money: number): boolean {
        if (!this.isValidAccount(account)) {
            return false;
        }
        this.balance[account - 1] += BigInt(money);
        return true;
    }

    /**
     * Withdraws money from an account if valid.
     * @param account Account number (1-based).
     * @param money Money to withdraw.
     * @returns True if successful, false otherwise.
     */
    withdraw(account: number, money: number): boolean {
        if (!this.isValidAccount(account)) {
            return false;
        }
        const amt = BigInt(money);
        if (this.balance[account - 1] < amt) {
            return false;
        }
        this.balance[account - 1] -= amt;
        return true;
    }

    /**
     * Helper to check if the account number is valid.
     */
    private isValidAccount(account: number): boolean {
        return account >= 1 && account <= this.balance.length;
    }
}

// --- IOCE: Input/Output Code Example ---

// Input
const bank = new Bank([10, 100, 20, 50, 30]);
console.log(bank.withdraw(3, 10));    // Output: true
console.log(bank.transfer(5, 1, 20)); // Output: true
console.log(bank.deposit(5, 20));     // Output: true
console.log(bank.transfer(3, 4, 15)); // Output: false
console.log(bank.withdraw(10, 50));   // Output: false

// After the above operations, account balances can be checked for debugging if needed:
//// Account 1: 30
//// Account 2: 100
//// Account 3: 10
//// Account 4: 50
//// Account 5: 30

/*

Expected Console Output:
true
true
true
false
false

*/