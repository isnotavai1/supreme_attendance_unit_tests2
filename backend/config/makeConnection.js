const mongoose = require('mongoose');
async function makeConnection(con){
    try{
        await mongoose.connect(con)
        console.log("connected")
    }
    catch(err){
        console.log("Unable to connect: " , err);
    }
}
module.exports = makeConnection