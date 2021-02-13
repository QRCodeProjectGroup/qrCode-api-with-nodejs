const express = require('express');
const router = express.Router();

const MenuSchema = require('../Model/Menu');

router.post('/',(req,res)=>{
  const newMenu = new MenuSchema(req.body);
  const promise = newMenu.save();

  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })

});

router.get('/',(req,res) =>{
  const promise = MenuSchema.aggregate([
    {
      $lookup:{
        'from':'details',
        'foreignField':'product_id',
        'localField':'_id',
        'as':'details'
      }
    },

    {
      $unwind:{
        path:'$details'
      }
    },

    {
      $group:{
        _id:{
          _id:'$_id',
          mekan:'$place',
        },
        details:{
          $push:'$details'
        }
      }
    },

    {
      $project:{
        _id:'$_id._id',
        mekan:'$_id.place',
        details:'$details'
      }
    }

  ]);

  promise.then((data) =>{
    res.json(data)
  }).catch((err) =>{
    res.json(err)
  })

})


module.exports = router;
