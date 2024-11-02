import "dotenv/config";
import { app } from "./app.js";
import mongoose from "mongoose";

// Database connection
mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then((database) => {
    console.log("Database connected :: ", database.connection.host);

    // Start server after successful database connection
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database: ", err.message);
    process.exit(1);
  });
