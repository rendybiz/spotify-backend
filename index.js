/**
 * Do some import require here
 */
const express = require('express')
const cors = require('cors');
const generalRoute = require('./src/routes/general.route');
require('dotenv').config()


const app = express()
const port = 3001
app.use(cors())

generalRoute(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})