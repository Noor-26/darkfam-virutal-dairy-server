const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const { MongoClient, ServerApiVersion} = require('mongodb');

//middlewere
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.okboq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => { 
    try{
        await client.connect()
        const memoryCollection = client.db("virtual-dairy").collection("memorys");
        app.post('/memory', async(req,res) => {
            const memory = req.body;
            const addMemory = await memoryCollection.insertOne(memory)
            res.send(addMemory);
        })
        app.get('/memory', async (req,res) =>{
            const email = req.query.email
            const filter = {email:email}
            const findData = await memoryCollection.find(filter).toArray()
            res.send(findData)
        })
    }
    finally{

    }
}
run()
app.get('/',(req,res) => {
    res.send('Success the surver is running')
})

app.listen(port,() => {
    console.log('Connections to the port done'); 
})