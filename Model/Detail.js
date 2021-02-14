const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detilSchema = new Schema({
    "product_id": Schema.Types.ObjectId,
    "menuName":{
        type:String
    },
    "detail":[
        {
            "product":{
                type:String
            },
            "content":{
                type:String
            },
            "photo":{
                type:String
            },
            "price":{
                type:Number
            },
            "like":{
                type:Number
            },
            "comments":{
                "anonim":[
                    {
                        type:String
                    }
                ]
            }
        }
    ]
    
});

module.exports = mongoose.model('Detail',detilSchema)