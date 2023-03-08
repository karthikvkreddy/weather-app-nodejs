const path = require('path')
const express = require('express')
const hbs = require('hbs');

const app = express()

const geocode = require('../../weather-app/utils/geocode');
const forecast = require('../../weather-app/utils/forecast');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views/');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handle bars & views locations
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Manually rendering the static files url/index.html
app.get('', (req, res) => {
    res.render('', {
        title: 'Weather App',
        name: 'Karthik'
    });
});

// dynamic rendering using template
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Karthik'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Karthik'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Karthik'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({
                error
            });
        } 

        forecast(latitude, longitude, (error, forecastDate) => {
            if (error) {
                return res.send({error});
            }

            return res.send({
                forecast: forecastDate,
                location,
                address: req.query.address
            })
        })
    })
})


// Error page
app.get('/help/*', (req,res) => {
    res.render('404',{
        errorMessage: "Help article not Found"
    });

});

app.get('/about/*', (req,res) => {
    res.render('404',{
        errorMessage: "About artical not Found"
    });
});

app.get('*', (req,res) => {
    res.render('404',{
        errorMessage: "Page Not Found"
    });

});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})