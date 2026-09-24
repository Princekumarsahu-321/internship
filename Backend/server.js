import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/db/db.js";

import cors from "cors";

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://your-project.vercel.app"
        ],
        credentials: true
    })
);

const PORT = process.env.PORT || 3000;

await connectDB();

app.listen(PORT,"0.0.0.0",() => {
  console.log(`Server running on port ${PORT}`);
});