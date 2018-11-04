require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const router = require('./routes')
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

app.listen(port,
  () => console.log(`Whitney Carney - Free Estimate Service listening on port ${port}!`)
);