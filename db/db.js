import mongoose from "mongoose";
import app from "../app.js";

mongoose.set("strictQuery", false);

const DB_URI = process.env.DB_URI;

const PORT = process.env.port || 3000;

async function main() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
