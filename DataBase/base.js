const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb+srv://cem:adsadsads1@menum.k3aqx.mongodb.net/menum?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('open',()=>{
        console.log('mongoDB: Connection')
    })
    mongoose.connection.on('error',()=>{
        console.log('mongoDB: Error')
    })
}