const path = require ('path')
const express =require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app =express()

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewpath =path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title : 'weather-app' ,
        name : 'Namrata'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'about me',
        name : 'Namrata Basrani'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
       
        title : 'Need help?' ,
         message : 'refer here to get help about weather app.',
        name : 'Namzzz'
    })
})

app.get('/products',(req,res) =>{
if(!req.query.search){
    return res.send({
        error: 'please enter the search term'
    })
}
console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get('/weather' ,(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'please enter the address to visit'
        })
    }

    geocode(req.query.address , (error,{ latitude,longitude,location } ={}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('help',{
        title : '404',
        name : 'Namrata',
        errorMessage : 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Namrata',
        errorMessage : 'page not found'
    })
})


app.listen(port, () => {
    console.log('server running on port '+port);   
})