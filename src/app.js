const path = require('path')
const express = require('express')
const hbs = require('hbs')
const moment = require('moment')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Troy Cabayao & Earl Christian Lizada'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Troy Cabayao & Earl Christian Lizada'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'An error occured please try again!',
        title: 'Help',
        name: 'Troy Cabayao & Earl Christian Lizada'
    })
})

const date = moment().format('dddd MMM D,')

app.get('/weather', (req, res) => {
    if (!req.query.address) {
            return res.send({
                error: 'You need to provide an address!'
            })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                date,
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
 })

app.get('/products', (req, res) => {

    if (!req.query.search) {
      return  res.send({
            error: 'Please provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Troy Cabayao & Earl Christian Lizada',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'Troy Cabayao & Earl Christian Lizada',
       errorMessage: 'Page not Found!'
   })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
