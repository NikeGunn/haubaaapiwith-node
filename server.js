const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


mongoose.
connect('mongodb+srv://Haubaa:hauba123456@haubaapi.mipwaf4.mongodb.net/Hauba-API?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));
