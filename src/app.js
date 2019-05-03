const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', 
    {
        title: 'Weather',
        name: 'Idan Gigi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', 
    {
        title: 'about',
        name: 'Name'
    })
})

app.get('/help', (req, res) => {
    res.render('help', 
    {
        message: 'That\'s a message',
        title: 'help',
        name: 'Another name xD'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'No address'
        })
    }else{
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                res.send({
                    error
                })
            }else{
            forcast(latitude, longitude, (error, { summary, temperature, precipPropability } = {}) => {
                if (error) {
                    res.send({
                        error
                    })
                }else{
                    res.send({
                        temperature,
                        location,
                        summary,
                        precipPropability   
                        })
                    }
                })
            }
        })
    }

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        name: 'Not my page',
        errorMsg: 'Broken link sorrry, cannot find article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        name: 'Not my page',
        errorMsg: 'Broken link sorrry'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})