const express = require('express');
const router = express.Router();

const detailSchema = require('../Model/Detail');

router.post('/',(req,res) =>{
    const newDetail = new detailSchema(req.body);
    const promise = newDetail.save();

    promise.then((data) =>{
        res.json(data)
    }).catch((err)=>{
        res.json(err)
    })

})

module.exports = router;