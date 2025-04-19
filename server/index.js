import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
import {
  testConnection as testElasticConnection,
  elasticClient,
  isElasticsearchAvailable,
} from "./config/elasticSearch.js";
//routes
import userRoutes from "./routes/userRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import restaurantRoutes from "./routes/restaurantRoute.js";
import addressRoutes from "./routes/addressRoutes.js";
import cartRoutes from "./routes/cartRoute.js";
import llmRoutes from "./routes/admin/llmRoutes.js";

//adminRoutes
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import adminRestaurantRoutes from "./routes/admin/adminRestaurantRoutes.js";
import adminMenuRoutes from "./routes/admin/adminMenuRoutes.js";
import adminOrderRoutes from "./routes/admin/adminOrderRoutes.js";

const port = process.env.PORT || 5000;

connectDb();

// Test Elasticsearch connection
testElasticConnection()
  .then((connected) => {
    if (connected) {
      console.log("✅ Elasticsearch connection test successful");

      // Only try to create index if connection successful
      try {
        elasticClient.indices
          .exists({ index: "restaurants" })
          .then((exists) => {
            if (!exists) {
              console.log(
                "🔄 Restaurants index does not exist, will be created on first search"
              );
            } else {
              console.log("✅ Restaurants index exists");
            }
          })
          .catch((err) => {
            console.warn("⚠️ Could not check if index exists:", err.message);
          });
      } catch (error) {
        console.warn("⚠️ Error accessing Elasticsearch client:", error.message);
      }
    } else {
      console.warn(
        "⚠️ Elasticsearch connection test failed - search will use MongoDB fallback"
      );
    }
  })
  .catch((err) => {
    console.error("❌ Error testing Elasticsearch connection:", err.message);
    console.warn("⚠️ Search operations will use MongoDB fallback");
  });

const app = express();

//
// Increase the limit for parsed data (JSON)
app.use(express.json({ limit: "50mb" })); // Adjust '50mb' as needed
// Increase the limit for parsed data (URL-encoded)
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Adjust '50mb' as needed

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://fooddelivery-core-client.vercel.app",
  ], // Client's URL, not the server's
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // This will handle all preflight requests

// app.use(cors());
app.use(cookieParser());

//test
app.get("/", (req, res) => {
  res.json("Hello");
});

//users
app.use("/api/users", userRoutes);
//home
app.use("/api/users", homeRoutes);
//restaurant
app.use("/api/users", restaurantRoutes);
//address
app.use("/api/users", addressRoutes);
//cart
app.use("/api/users", cartRoutes);
//llm
app.use("/api/llm", llmRoutes);

////////// ADMIN /////////////
app.use("/api/admin", adminUserRoutes);
app.use("/api/admin", adminRestaurantRoutes);
app.use("/api/admin", adminMenuRoutes);
app.use("/api/admin", adminOrderRoutes);

////////////DEPLOYMENT //////////////

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "../client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running successfully");
  });
}
////////////DEPLOYMENT //////////////

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port}`));
