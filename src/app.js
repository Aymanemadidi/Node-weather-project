const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/fetchWeather')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const absolutePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to use
app.use(express.static(absolutePath));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Aymane El madidi'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Aymane El madidi'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Aymane El madidi'
    });
})

app.get('/weather', (req, res)=>{
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>
    {
        if (error)
        {
            return res.send({
                error
            })
        }
        else if (!req.query.address)
        {
            return res.send({
                error: 'Please provide a valid location'
            })
        }
        forecast(latitude, longitude, (error, forecast)=>
        {
            if (error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'help 404',
        name: 'Aymane El madidi',
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Aymane El madidi',
        message: 'Page not found'
    })
})



app.listen(port, ()=>{
    console.log('Server is Up on port ' + port);
})
