const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./modals/productModal')
const port = 3000


app.use(express.json())
app.use(express.urlencoded( { extended: true }) )


//-----------------GET-ALL DATA FROM DATABASE-----------------//
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error.message)
    }})


//-----------------GET-ALL DATA FROM DATABASE BY ID-----------------//
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error.message)
    }})    



//-----------------POST-SAVE DATA TO DATABASE-----------------//    
app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }})



//-----------------UPDATE DATA FROM DATABASE-----------------//
app.put('/products/:id', async(req, res) => {
    try {
       const {id} = req.params
       const product = await Product.findByIdAndUpdate(id, req.body)
       //We cannot find data in database
        if(!product){
            return res.status(404).json(`Product with id ${id} not found`)
        }
        const updated = await Product.findById(id)
        res.status(200).json(updated)

    } catch (error) {
        res.status(500).send(error.message) 
    }
})


//-----------------DELETE DATA FROM DATABASE-----------------//

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        //We cannot find data in database
        if(!product){
            return res.status(404).json(`Product with id ${id} not found`)
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//-----------------CONNECT TO DATABASE-----------------//
mongoose.
connect('mongodb+srv://Haubaa:hauba123456@haubaapi.mipwaf4.mongodb.net/Hauba-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB...')
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`)
      });
})
.catch((error) => 
    console.log(error))
