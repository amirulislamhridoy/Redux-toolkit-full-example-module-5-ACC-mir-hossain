const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var cors = require('cors')
require('dotenv').config()
var bodyParser = require('body-parser')

app.use(cors())
// app.use(bodyParser.json())
app.use(express.json())

// const uri = "mongodb+srv://practise:32202910@cluster0.0exa02b.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.0exa02b.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const products = client.db("test").collection("products");
//   // perform actions on the collection object
//   client.close();
// });
async function run() {
    try {
        const products = client.db("test").collection("products");
        app.get('/', async (req, res) => {
            const query = {};
            const cursor = products.find(query);
            const data = await cursor.toArray()
            res.send(data)
        })
        app.get("/product/:id", async(req, res) => {
            const {id} = req.params
            const query = {_id: new ObjectId(id)}
            const data = await products.findOne(query)
            res.json(data).status(200)
        })
        // filter api system
        app.get('/search', async (req, res) => {
            const name = req.query.name
            // const data = await products.find({
            //     "$or": [
            //         {"brand": {$regex: 'md'}}
            //     ]
            // }).toArray()
            // const data = await products.find({brand: {$regex: 'md'}}).toArray()
            const data = await products.find({ brand: { $regex: 'MD' } }).toArray()
            res.json('aa')
        })

        app.post('/add', async (req, res) => {
            const data = req.body
            const success = await products.insertOne(data)
            res.json(success).status(200)
        })
        
        app.delete('/remove/:id', async (req, res) => {
            const { id } = req.params
            const query = { _id: new ObjectId(id) };
            const result = await products.deleteOne(query);
            console.log(result)
            res.json(result).status(200)
        })

    } catch (e) {
        client.close();
    }
}
run().catch(console.dir)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})