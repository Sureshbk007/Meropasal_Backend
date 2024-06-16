import "dotenv/config";
import { app } from "./app.js";

// Database connection
// mongoose
//   .connect(process.env.MONGODB_ATLAS_URI)
//   .then((database) => {
//     console.log(
//       "Database connected :: ",
//       database.connection.host,
//       database.connection.name,
//       database.connection.port
//   })
//     );
//   .catch((err) => {
//     console.log("Failed to connect to database", err.message);
//     process.exit(1);
//   });

// Start server after successful database connection
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
