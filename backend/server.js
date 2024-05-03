const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
const guideRouter = require('./routes/guide')

mongoose.connect(process.env.DB_URI);

const db = mongoose.connection
db.once('open', () => console.log('Connected to DB!'))

app.use(express.json())

app.use('/api/guide',guideRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})