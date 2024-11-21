const mongoose = require("mongoose")

async function ConnectDb() {
    await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('Server is Connected With Database')
    })
}

module.exports = {ConnectDb}