const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID } = require('bson');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.SELLER_DB}:${process.env.SELLER_PASSWORD}@cluster0.bytxh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoryCollection = client.db("sellerHope").collection("productCategories");
        const itemCollection = client.db("sellerHope").collection("productItem");
        const userCollection = client.db("sellerHope").collection("users");


        app.get('/categories', async (req, res) => {

            const query = {};
            const result = await categoryCollection.find(query).toArray();

            res.send(result)
        })
        app.get('/itemByCategory/:brand', async (req, res) => {
            const brand = req.params.brand;
            const query = { brand: brand };
            // const query = {}
            const result = await itemCollection.find(query).toArray();
            res.send(result)
        })


        app.post('/addProduct', async (req, res) => {
            const product = req.body;
            const result = await itemCollection.insertOne(product);
            res.send(result)
        })
        app.get('/products', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await itemCollection.find(query).toArray();

            res.send(result)
        })
        app.post('/storeUsers', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(error => console.log(error))

app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'success'
    })
})
app.listen(port, () => {
    console.log(`server is running port: ${port}`);
})


