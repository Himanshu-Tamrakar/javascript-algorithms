import { hashCode } from "../../common/index.js";
export class Transaction {
    constructor(name, date, amount) {
        if (typeof name !== 'string') throw new TypeError('Transaction Name should be string');
        if (typeof date !== 'string') throw new TypeError('Date should be string');
        if (typeof amount !== 'number') throw new TypeError('Amount should be number');

        this._name = name;
        this._date = date;
        this._amount = amount;
    }

    compareTo(that) {
        if (this._amount === that._amount) return 0;
        return this._amount < that._amount ? -1 : 1; 
    }

    toString() {
        return `Transaction Name ${this._name} Date ${this._date} Amount: ${this._amount}`;
    }

    hashCode() {
        let h = 1;
        const R = 31;

        h = (h * R) + hashCode(this.name);
        h = (h * R) + hashCode(this.date);
        h = (h * R) + hashCode(this.amount);

        return h;
    }
}