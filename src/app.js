const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocodes = require('./utils/geocode.js')

//Handlebars Location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'))

//Static Directory
app.use(express.static(path.join(__dirname, '../public',)))

//Set Partials
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Clyde'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: ' About Page',
        name: 'Clyde'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: ' Help Page',
        name: 'Clyde'
    })
})



app.get('/Weather', (req, res) => {
    if (req.query.address) {

        geocodes.geoCode(req.query.address, (resp = {}) => {
            geocodes.weather(resp.lattitude + ',' + resp.longitude, (data, error) => {
                if (error) {
                    return res.send(error)
                }
                else {
                    return res.send(data)
                }
            })

        })
    }
    else {
        return res.send({ 'error': 'Address is required' })
    }
})


app.get('/products', (req, res) => {

    if (req.query.search) {

        console.log(req.query.search)
        const data = {
            produts: []
        }
        return res.send(data)
    }
    else {
        return res.send('Serach Query required')
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Clyde',
        error: 'Bad Help Article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 Page',
        name: 'Clyde',
        error: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000 ')
})