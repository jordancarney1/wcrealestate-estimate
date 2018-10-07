const path = require('path')
const router = module.exports = require('express').Router()
const routes = [
  require('./estimate-request'),
]

routes.forEach(route => router.use(route))

// Temporary route - remove later
router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/../index.html')))

router.get('/bundle.js', (req, res) => res.sendFile(path.join(__dirname + '/../bundle.js')));
