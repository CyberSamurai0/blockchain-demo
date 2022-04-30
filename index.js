const {Block, Blockchain, Transaction} = require("./classes");

const Express = require("express");
const bodyParser = require("body-parser");
let app = Express();

let jsonParser = bodyParser.json();

let BlockChain = new Blockchain();
let transactions = [];

app.use(Express.static("./assets"));
app.use(jsonParser);

app.post("/new-block", async (req, res) => {
    try {
        if (req.body["transactions"] && Array.isArray(req.body["transactions"]) && req.body["transactions"].length >= 1) {
            let valid = true;
            let transactions = [];
            for (let transaction of req.body["transactions"]) {
                if (transaction["sender"] && transaction["receiver"] && transaction["amount"] && typeof transaction["sender"] === "string" && typeof transaction["receiver"] === "string" && typeof transaction["amount"] === "string" && parseInt(transaction["amount"])) {
                    transactions.push(new Transaction(transaction["sender"], transaction["receiver"], parseInt(transaction["amount"])));
                } else {
                    res.status(400).send();
                    valid = false;
                    break;
                }
            }
            if (valid) {
                BlockChain.addBlock(new Block(transactions, BlockChain.length));
                console.log("Added new block to blockchain:");
                console.log(BlockChain.getLastBlock());
                res.status(200).send(BlockChain.getLastBlock());
            }
        } else {
            res.status(400).send();
        }
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Express bound to http://localhost:3000/")
});