const request =require ('request')

const forecast =(latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=12d9179331288e4852fe360700f177af&query= '+latitude+','+longitude+'&units=f'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback(undefined,'cannot connect to the weather service')
        }
        else if(body.error)
        {
            callback(undefined,'cannot find the location.Try again')
        }
        else{
        
            
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out.It feels like '+body.current.feelslike+' degress out. The humidity is '+body.current.humidity+'%.')
        }
    })
}

module.exports =forecast