//1-mongodb (1.ติดตั้ง Mongoose 2.เชี่อม Mongodb โดย Mongoose 3.ออกแบบ Schema และ model 4.นำ Model ไปใช้งาน)
// โครงสร้างคำสั่ง npm install mongoose => mongoose.connect('mongodb://<hostname:port>/<database>',{useNewUrlParser:true,useUnitfuedTopology:true}).catch(err=>console.log(err))
//สร้าง Schema และ model  => 1.mongoose.Schema({field:type,field:type})  2.const productSchema = mongoose.Schema({name:string,price:Number,description:string,imagePath:string})
//เรียกใช้งาน mongoose.model('ชื่อ Collection',schema) Modelคือส่วนที่ใช้จัดการเกี่ยวกับข้อมูลเช่น let Product = mongoose.model('ชื่อ Collection', product)  => model.export = ProductSchema => exportออกไปใช้นั้นเอง


//เรียกใช้งาน Mongoose 
const mongoose = require('mongoose')

// เชีอมไปยัง Mongodb
const dbUrl ='mongodb+srv://d27saitunlu:cQ8ppx22JYaohtq1@cluster0.mtjpud0.mongodb.net/productDB2' 

//d27saitunlu  cQ8ppx22JYaohtq1 mongodb+srv://d27saitunlu:<password>@cluster0.mtjpud0.mongodb.net/
mongoose.connect(dbUrl,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).catch(err=>console.log(err))

// ออกแบบ  schema 
var productSchema = mongoose.Schema({
    name:String,
    price: Number, 
    image:String,
    description: String
})

// สร้าง model
var Product = mongoose.model("products",productSchema)

//  ส่งออก model
module.exports = Product

//ออกแบบ ฟังชั้นบันทึกข้อมูล
module.exports.saveProduct = function(model,data){
  model.save(data)
}