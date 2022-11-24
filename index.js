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
        app.get('/categories', async (req, res) => {
            // const number = 3;
            const query = {};
            const cursor = categoryCollection.find(query);
            const services = await cursor.toArray();
            res.send({
                status: true,
                message: "success",
                data: services
            })
        })
        app.get('/itemByCategory', async (req, res) => {
            // const number = 3;

            let query = {};
            console.log(req.query._id);
            if (req.query._id) {
                query = {
                    _id: req.query._id
                }
            }
            const cursor = itemCollection.find(query);
            const services = await cursor.toArray();
            res.send({
                status: true,
                message: "success",
                data: services
            })
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


