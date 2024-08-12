const express = require('express')
var bodyParser = require('body-parser')
require('./models/index')
var userCtrl=require('./models/controllers/userController')
const app = express()
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('Hello World')
})
// create route this is all routes
app.get('/add',userCtrl.addUser)
app.get('/users',userCtrl.getUsers)
app.get('/users/:id',userCtrl.getUser)
app.post('/users',userCtrl.postUsers)
app.delete('/users/:id',userCtrl.deleteUser)
app.patch('/users/:id',userCtrl.patchUser)
// Query
app.get('/query',userCtrl.queryUser)
//finders
app.get('/finders',userCtrl.finderUser)
// get-Set-Virtual
app.get('/get-set-virtual',userCtrl.getSetVirtualUser)
app.get('/validate',userCtrl.validateUser)

//User.sync({ force: true });// it is used to create table in databases
//Contact.sync({force:true});
//User.sync();
//User.drop();// it is used to created

app.listen(3000,()=>{
    console.log('app will run on: http://localhost:3000')
})