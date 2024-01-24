const express = require('express')
const app = express()
const moviesRouter = require('./routes/moviesRouter')
const performersRouter = require('./routes/performersRouter')

app.use(express.json())
app.use('/movies', moviesRouter)
app.use('/performers', performersRouter)

module.exports = app