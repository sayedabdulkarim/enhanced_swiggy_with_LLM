import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
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

const app = express();

//
// Increase the limit for parsed data (JSON)
app.use(express.json({ limit: "50mb" })); // Adjust '50mb' as needed
// Increase the limit for parsed data (URL-encoded)
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Adjust '50mb' as needed

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://enhanced-swiggy-with-llm-client.vercel.app",
  "https://enhanced-swiggy-with-llm-admin.vercel.app",
  "https://enhanced-swiggy-with-llm-client-git-main.vercel.app",
  "https://enhanced-swiggy-with-llm-admin-git-main.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin);
      // For debugging and development, we'll allow all origins
      callback(null, true);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-csrf-token",
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Date",
    "X-Api-Version",
  ],
  exposedHeaders: ["Content-Length", "X-CSRF-Token"],
};

// Apply CORS middleware first
app.use(cors(corsOptions));

// Handle OPTIONS requests explicitly
app.options("*", (req, res) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,x-csrf-token,X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Date,X-Api-Version"
  );
  res.setHeader("Access-Control-Max-Age", "86400");
  res.status(204).end();
});

// Additional middleware to ensure CORS headers are set on all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,x-csrf-token,X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Date,X-Api-Version"
  );

  next();
});

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

// app.listen(port, () => console.log(`server is running on ${port}`));

export default app;
