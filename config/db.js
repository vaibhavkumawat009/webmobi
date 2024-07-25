const mongoose = require("mongoose")
//db connection entry point
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://vaibhavdd:12345@itgeeks.ltypt4d.mongodb.net/?retryWrites=true&w=majority&appName=itgeeks/vaibhav`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports =  connectDB