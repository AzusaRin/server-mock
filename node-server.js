const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((request,result) =>{
let pathObj = url.parse(request.url,true)
switch (pathObj,pathname){
case '/getWeather':
  if(pathObj.query.city === 'beijing')
  result.end(JSON.stringify({city:'beijing',weather:'sunny'}))
  else
  result.end(JSON.stringify({city:pathObj.query.city,weather:'unknown'}))
break
default:
  try{
    let pathname = pathObj.pathname === '/'? '/index.html' : pathObj.pathname
    result.end(fs.readFileSync(__dirname + pathname))
  }catch(e){
    result.writeHead(404,'Not Found')
    result.end('<h1>404 Not Found</h1>')
  }
}
}).listen(8080)