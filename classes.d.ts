export declare class Block {
    constructor(transactions: Transaction[], index: number);
    private index: number;
    private time: number;
    private transactionList: Transaction[];
    private previousHash: string;
    private hash: string;

    public getHash(): string;
    public setPreviousHash(hash: string): void;
}

export declare class Transaction {
    constructor(sender: String, receiver: String, amount: number);
    private sender: string;
    private receiver: string;
    private amount: number;
    private time: number;
    private hash: string;

    public getHash(): string;
}

export declare class Blockchain {
    constructor();
    public chain: Block[];
    public length: number;

    public getLastBlock(): number;
    public addBlock(block: Block): void;
}