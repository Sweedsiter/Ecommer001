//เรียกใช้งาน
const mongoose = require('mongoose')
const urlDb = 'mongodb://localhost:27017/productDB2';
mongoose.connect(urlDb,{
      useNewUrlParser:true,
      useUnifiedTopology:true,
}).catch(err=>console.log(err))

let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description: String
})

let Product = mongoose.model("products",productSchema)

module.exports = Product

//ออกแบบ ฟังชั้นบันทึกข้อมูล
module.exports.saveProduct = function(model,data){
    model.save(data)
}

