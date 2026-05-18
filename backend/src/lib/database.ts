import mongoose from "mongoose";

export const connectDB = async () => {
    let retries = 5;
    while (retries > 0) {
        try {
            if (!process.env.MONGO_URI) {
                throw new Error("MONGO_URI is not defined");
            }

            const conn = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB connected: ${conn.connection.host}`);
            return; // Exit loop on success
        } catch (error: any) {
            console.log(`Error connecting to MONGODB, retries left: ${retries - 1}`, error.message);
            retries -= 1;
            if (retries === 0) {
                console.log("Max retries reached. Exiting...");
                process.exit(1);
            }
            // Wait 2 seconds before retrying
            await new Promise(res => setTimeout(res, 2000));
        }
    }
};