import { connect } from 'mongoose';


const connectDB = async () => {
    try {
        const conn = await connect(process.env.DB_URI, {
                dbName: "pocket-pickup-db",
                user: "pocket-pickup-user",
                pass: process.env.DB_PASS,
              });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        console.log("Hello");
        process.exit(1);
    }
}

export default connectDB;