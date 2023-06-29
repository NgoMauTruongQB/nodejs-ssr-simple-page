const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require ('express-handlebars')
var methodOverride = require('method-override')
const app = express()
const port = 3000

const SortMiddlleware = require('./app/middleware/sortMiddleware')

const route = require('./routes')
const db = require('./config/db')

db.connect()

// Using static file
app.use(express.static(path.join(__dirname, 'public')))

// Using Middlewear
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// method override
app.use(methodOverride('_method'))

// using Sort Middleware
app.use(SortMiddlleware)

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: require('./helpers/helpersHandlebars')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Routes init
route(app)


app.listen(port, () => {
    console.log(`App listening on port 127.0.0.1:${port}`)
})

