const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')

const app = express()
const port = process.env.PORT || 3000


// Config public and views folder path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// public directory static path to use in express
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title : "Weather",
        name : "Devendra Singh"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : "About Me",
        name : "Devendra Singh"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : "Help Page",
        name : "Devendra Singh",
        message : "This is some helpful text"
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : "You must provide an address."
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, placeName}={}) => {
        if(error){
            return res.send({
                error : error
            })
        }
        foreCast(latitude,longitude,(error,foreCastData) => {
            if(error){
                return res.send({
                    error : error
                })
            }

            res.send({
                forecast : foreCastData,
                placeName,
                address : req.query.address
            })
        })
    })

    // res.send({
    //     address : req.query.address,
    //     forecast : {
    //         temperature : 28
    //     }
    // })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : '404 Error Page',
        name : 'Devendra Singh',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title : '404 Error Page',
        name : 'Devendra Singh',
        errorMessage : "Page not found"
    })
})

app.listen(port, ()=> {
    console.log(`App is running on port ${port}`)
})