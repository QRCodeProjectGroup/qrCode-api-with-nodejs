const express = require('express');
const router = express.Router();

const detailSchema = require('../Model/Detail');

router.get('/',(req,res) =>{
    const promise = detailSchema.find({ })
    promise.then((data)=>{
        res.json(data)
    }).catch((err) =>{
        res.json(err)
    })
});

router.post('/',(req,res) =>{
    const newDetail = new detailSchema(req.body);
    const promise = newDetail.save();

    promise.then((data) =>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })

});

router.delete('/delete/:id',(req,res) =>{
    const promise = detailSchema.findByIdAndDelete(req.params.id)

    promise.then((data) =>{
        if(!data)
            res.json({message:'No products associated with this id found',status:false})
        res.json({message:'The product was successfully deleted.',code:1})
    }).catch((err)=>{
        res.json(err)
    })
});

router.put('/update/:id',(req,res) =>{
    const promise = detailSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
    )
    promise.then((data) =>{
        if(!data)
            res.json({message:'No products associated with this id found',status:false})
        res.json(data)
    }).catch((err) =>{
        res.json(err)
    })
})

module.exports = router;