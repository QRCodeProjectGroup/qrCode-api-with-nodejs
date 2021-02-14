const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    "place":[
        {
            "placeName":{
                type:String,
            },
            "adress":{
                type:String
            },
            "webSite":{
                type:String
            },
            "totalVisit":{
                type:Number
            },
            "totalLike":{
                type:Number
            },
            "point":{
                type:Number
            },
            "orderSpeed":{
                type:String
            }
        }
    ]
})

module.exports = mongoose.model('Menü',MenuSchema);