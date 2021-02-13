const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = require('../config');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = require('../Model/Users');


router.post('/addUser',(req,res) =>{
  const {username,password} = req.body;
  bcrypt.genSalt(saltRounds,(err,salt) =>{
    bcrypt.hash(password,salt,(err,hash)=>{
      const user = new userSchema({
        username:username,
        password:hash
      })
      const promise = user.save()
      promise.then((data) =>{
        res.json(data)
      }).catch((err) =>{
        res.json(err)
      })
    });
  });
});

router.post('/authenticate',(req,res) =>{
  const {username,password} = req.body;

  userSchema.findOne({
    username
  },(err,user) =>{

    if(!user){

      res.json({message:"This username not found",status:false})

    }else{

      bcrypt.compare(password,user.password).then((result) =>{

        if(!result){

          res.json({message:"Wrong password.",status:false})

        }else{

          const payload = {
            username
          }

          const token = jwt.sign(payload,secretKey.api_secret_key);

          res.json({
            status:true,
            token
          })

        }
      });
    }
  });

})

module.exports = router;
