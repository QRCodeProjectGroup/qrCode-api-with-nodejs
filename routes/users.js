const express = require('express');
const router = express.Router();
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
    })
  })
})

module.exports = router;
