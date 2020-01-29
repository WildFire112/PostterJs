const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const formData = require('express-form-data')
const path = require('path')

// Import Routes
const postsRoute = require('./routs/posts')
const authRoute = require('./routs/auth')
const usersRoute = require('./routs/users')


dotenv.config()

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, (err) =>
  console.log('connected to db!\nconnection errors:', err)
)

// Middlewares
app.use(bodyParser.json())
app.use(formData.parse())

// Route Middlewares
app.use('/api/posts', postsRoute)
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)

// Sevre static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log('Server Up and running') })
