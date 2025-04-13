import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Check if Elasticsearch is enabled
export const ELASTICSEARCH_ENABLED =
  process.env.ELASTICSEARCH_ENABLED !== "false";

// Check required environment variables and provide guidance
export const checkEnvironment = () => {
  console.log("Checking environment configuration...");

  // Check .env file exists
  if (!fs.existsSync(".env")) {
    console.warn(
      "⚠️ No .env file found. You may need to create one with required settings."
    );
  }

  // Check Elasticsearch configuration
  if (ELASTICSEARCH_ENABLED) {
    if (!process.env.ELASTICSEARCH_NODE) {
      console.warn(
        "⚠️ ELASTICSEARCH_NODE not set in .env - using default: http://localhost:9200"
      );
    }

    if (
      process.env.ELASTICSEARCH_USERNAME &&
      !process.env.ELASTICSEARCH_PASSWORD
    ) {
      console.warn(
        "⚠️ ELASTICSEARCH_USERNAME is set but ELASTICSEARCH_PASSWORD is missing"
      );
    }
  } else {
    console.log(
      "Elasticsearch is disabled by configuration. MongoDB will be used for all searches."
    );
  }

  // Check for other required environment variables
  // ... add more checks as needed
};

// Prepare a sample .env template with all required variables
export const generateEnvTemplate = () => {
  return `# Server Configuration
PORT=8001
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=30d

# Elasticsearch Configuration
ELASTICSEARCH_ENABLED=true
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_USERNAME=
ELASTICSEARCH_PASSWORD=
ELASTICSEARCH_REJECT_UNAUTHORIZED=false
`;
};

export default {
  ELASTICSEARCH_ENABLED,
  checkEnvironment,
  generateEnvTemplate,
};
