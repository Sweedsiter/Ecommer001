//modele Url ให้เรียกใช้ก่อนที่จะทำต่อ const {pathname,query}=url.parse(req.url,true)

const http = require('http')
const fs = require('fs')
const url = require('url')

const indexpage = fs.readFileSync(`${__dirname}/templates/index.html`,'utf-8')
const Product1 = fs.readFileSync(`${__dirname}/templates/product1.html`,'utf-8')
const Product2 = fs.readFileSync(`${__dirname}/templates/product2.html`,'utf-8')
const Product3 = fs.readFileSync(`${__dirname}/templates/product3.html`,'utf-8')
http.createServer((req,res)=>{
    const {pathname,query}=url.parse(req.url,true)         
   if(pathname==='/' || pathname==='/home'){
    res.end(indexpage)
   }else if(pathname==='/product'){      
    if(query.id==="1"){
        res.end(Product1)
    }else if(query.id==="2"){
        res.end(Product2)
    }else if(query.id==="3"){
        res.end(Product3)
    }else{
        res.end(indexpage)
    }
   
   }else{
    res.writeHead(404)
    res.end('cont not found')
   }
}).listen(8080,()=>{
    console.log("Startet post 8080 to now")
})