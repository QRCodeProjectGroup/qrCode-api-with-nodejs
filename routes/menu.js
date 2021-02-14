const express = require('express');
const Menu = require('../Model/Menu');
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
          place:'$place',
        },
        details:{
          $push:'$details'
        }
      }
    },

    {
      $project:{
        _id:'$_id._id',
        place:'$_id.place',
        details:'$details'
      }
    }

  ]);

  promise.then((data) =>{
    res.json(data)
  }).catch((err) =>{
    res.json(err)
  })

});

router.delete('/delete/:id',(req,res) =>{
  const promise = MenuSchema.findOneAndDelete(req.params.id);
  
  promise.then((data) =>{
    if(!data)
      res.json({message:'No products associated with this id found',status:false})
    res.json({message:'The product was successfully deleted.',code:1})
  }).catch((err) =>{
    res.json(err)
  });

});

router.put('/update/:id',(req,res) =>{
  const promise = MenuSchema.findOneAndUpdate(
    req.body,
    req.params.id,
    {
      new:true
    }
  );

  promise.then((data) =>{
    
    if(!data)
      res.json({message:'This products associated with this id found.',status:false})
    res.json(data)
  }).catch((err) =>{
    res.json(err)
  })

});


module.exports = router;
