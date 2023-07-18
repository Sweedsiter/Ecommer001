const express = require('express')
const router = express.Router()
const multer = require('multer')
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://d27saitunlu:cQ8ppx22JYaohtq1@cluster0.mtjpud0.mongodb.net/productDB2";
const client = new MongoClient(uri);
	const DB = client.connect()

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/images/products')
  },
  filename:function(req,file,callback){
    callback(null,Date.now()+".jpg")
  }
})
const upload = multer({
  storage: storage
})

//Create one
router.post('/insert',upload.single('image'),(req,res)=>{   
  const user = req.body;
	const client = new MongoClient(uri);
	 client.connect();
	 client.db('productDB2').collection('products').insertOne({	  
    name: req.body.name,
    price: req.body.price,    
    image: req.file.filename,
    description: req.body.description   	
	}).catch((err)=>{console.log(err)})	
  res.redirect('/')  
})
router.get('/addform',(req,res)=>{
  if(req.session.login){
    res.render('form')
  }else{
    res.render('admin')
  }
})

//Reat users
router.get('/',async (req,res)=>{
  const client = new MongoClient(uri);
	await client.connect();
	const users =  await client.db('productDB2').collection('products').find({}).toArray();
	await client.close();
	res.render('index',{products:users})   
   }) 
router.get('/manage',async (req,res)=>{ 

  if(req.session.login){
    const client = new MongoClient(uri);
    await client.connect();
    const users =  await client.db('productDB2').collection('products').find({}).toArray();
    await client.close();
    res.render('manage',{products:users})  
  }else{
    res.render('admin')
  }
})
//UpDate user
 router.post('/edit',async (req,res)=>{  
  const id = req.body.edit_id
  const client = new MongoClient(uri);
  await client.connect();
  const user = await client.db('productDB2').collection('products').findOne({'image' : id});  
  res.render('edit',{products:user})
})
router.post('/update', async(req, res) => {
	const user = req.body;
	const id = user.update_id
	const client = new MongoClient(uri);
	await client.connect();
	await client.db('productDB2').collection('products').updateOne({'image': id}, {'$set': {
    name: user.name,
    price: user.price, 
    description: user.description  	 
	}});
	await client.close();
  res.redirect('/')
  })
//Delete user
router.post('/delete',async (req,res)=>{
     const id = req.body.delete_id
     const client = new MongoClient(uri);
      await client.connect();
      await client.db('productDB2').collection('products').deleteOne({'image':id})
       await client.close();
      res.redirect('/')
}) 
router.get('/:id',async (req,res)=>{
 const id = req.params.id
 const client = new MongoClient(uri);
 await client.connect();
 const user = await client.db('productDB2').collection('products').findOne({'image' : id});  
 res.render('product',{products:user})
})

//login
router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 50000  //100วินาทีนั้นเอง
  
    if( username === '1' && password === '1'){   
      req.session.username = username
      req.session.password = password
      req.session.login = true
      req.session.cookie.maxAge =  timeExpire
      res.redirect('/manage')
    }else{ res.render('404')}  
  })
  //login
router.get('/logout',(req,res)=>{  
  req.session.destroy( (err)=>{ res.redirect('/manage')} )
})
module.exports = router