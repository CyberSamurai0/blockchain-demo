const sha256lib = require("js-sha256");

class Block {
    index;
    time;
    transactionList;
    previousHash;
    hash;

    constructor(transactions, index) {
        this.index = index;
        this.time = new Date().getTime();
        this.transactionList = transactions;
        this.hash = this.getHash();
    }

    getHash() {
        let transactions = "";
        for (let transaction of this.transactionList) transactions += transaction.hash;
        let info = this.index.toString() + this.time.toString() + transactions + this.previousHash;
        return sha256lib.sha256(info)
    }

    addTransaction(transaction) {
        this.transactionList.push(transaction);
    }
}

class Transaction {
    constructor(sender, receiver, amount) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.time = new Date().getDate();
        this.hash = this.getHash();
    }

    getHash() {
        let info = this.sender + this.receiver + this.amount.toString() + this.time.toString();
        return sha256lib.sha256(info);
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
        this.length = this.chain.length;
    }

    getLastBlock() {
        return this.chain.length >= 1 && this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        if (this.chain.length < 1) block.previousHash = "origin";
        else block.previousHash = this.getLastBlock().hash;
        this.chain.push(block);
        this.length = this.chain.length;
    }
}

module.exports = { Blockchain, Block, Transaction };