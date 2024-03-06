import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connected to mongo db");
    } catch (error) {
        console.log(error);
    }
}

export default connect;