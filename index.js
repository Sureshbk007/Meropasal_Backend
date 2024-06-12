import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { userRouter } from "./routes/index.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));

// Routes
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("what up mf`");
});

// Database connection
mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then((database) => {
    console.log(
      "Database connected :: ",
      database.connection.host,
      database.connection.name,
      database.connection.port
    );
    // Start server after successful database connection
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database", err.message);
    process.exit(1);
  });

// Global Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("something broke");
});

// Route for handling 404 error
app.use((req, res) => {
  res.status(404).send("Sorry, the resource you requested could not be found");
});
