require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)

// Temporary route - remove later
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.listen(port,
  () => console.log(`Whitney Carney - Free Estimate Service listening on port ${port}!`)
);