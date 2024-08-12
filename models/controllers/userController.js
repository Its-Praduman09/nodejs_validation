var db=require('../index') // here doubt
var User=db.user;
const { Sequelize,Op } = require('sequelize');
var addUser=async(req,res)=>
{
    const jane = await User.create({firstName: 'Badal',lastName:'Kumar'});
   // const jane = User.build({firstName: 'Jane',lastName:'Singh' });
    console.log(jane instanceof User); // true
    console.log(jane.firstName); // "Jane"
   // await jane.save();
    console.log('Jane was saved to the database!');
    console.log(jane.toJSON());
    res.status(200).json(jane.toJSON());
}
var getUsers=async(req,res)=>{
    const data= await User.findAll({});
    res.status(200).json({data:data});
}
    var getUser=async(req,res)=>{
    const data= await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data});
}

var postUsers=async(req,res)=>{
    var postData=req.body;
    if(postData.length>1)
    {
        var data= await User.bulkCreate(postData); 
    }
    else
    {
    var data= await User.create(postData);
    }
    res.status(200).json({data:data});
}

var deleteUser=async(req,res)=>{
    const data= await User.destroy({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data});
}

var patchUser=async(req,res)=>{
    var updatedData=req.body;
    const data= await User.update(updatedData,{
        where:{
            id:req.params.id
        }
    });
    res.status(200).json({data:data});
}
// Query function or route
var queryUser=async(req,res)=>{
    const data =await User.findAll({
        where: {
          id: {
            [Op.gt]: 2,
          },
        },
      });
    res.status(200).json({data:data});
}
// finders
var finderUser=async(req,res)=>{
    const {count, rows}= await User.findAndCountAll({
        where: {lastName: 'Singh' }
      });
    res.status(200).json({data:rows,data:count});
}
var getSetVirtualUser=async(req,res)=>{
    const data= await User.findAll({
        where: {lastName: 'Singh' }
      });
    res.status(200).json({data:data});
}
var validateUser=async(req,res)=>{
    var {data}={};
    var messages={};
    try{
         data= await User.create({
            firstName:'Rahul@123',
            lastName:'Kumar'
          });
    }
    catch(e)
    {
        //console.log(e.errors)
        let message;
        e.errors.forEach(error=>{
            switch(error.validatorKey)
            {
                case 'isAlpha':
                message='Only alphabets are allowed'
                break;
                case 'isLowercase':
                    message='Only Alphabets lowercase is allowed'
                    break;
            }
            messages[error.path]=message
        })
    }

    res.status(200).json({data:data,messages:messages});
}
module.exports=
{
    addUser,
    getUsers,
    getUser,
    postUsers,
    deleteUser,
    patchUser,
    queryUser,
    finderUser,
    getSetVirtualUser,
    validateUser
}