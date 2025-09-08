import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import app from "./src/app.js";
dotenv.config();

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
  })
  .catch((err) => console.log("Database connection failed ", err));
