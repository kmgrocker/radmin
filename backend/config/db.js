import Mongoose from "mongoose";

const connectDb = async () => {
    console.log('process',process.env.MONGO_LOCAL_URI)
    try {
        const conn = await Mongoose.connect(process.env.MONGO_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDb connected with host  ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        console.log("message", err.message);
        process.exit(1);
    }
};

export default connectDb;