import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";

dotenv.config();

// Create and configure Elasticsearch client with better error handling
const createElasticClient = () => {
  const node = process.env.ELASTICSEARCH_NODE || "http://localhost:9200";
  console.log("Connecting to Elasticsearch at:", node);

  let config = {
    node,
    maxRetries: 3,
    requestTimeout: 30000,
    sniffOnStart: false,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  // Only add auth if username is provided
  if (process.env.ELASTICSEARCH_USERNAME) {
    config.auth = {
      username: process.env.ELASTICSEARCH_USERNAME,
      password: process.env.ELASTICSEARCH_PASSWORD || "",
    };
    console.log("Using authentication for Elasticsearch");
  }

  return new Client(config);
};

// Create client with error handling
let elasticClient;
try {
  elasticClient = createElasticClient();
  console.log("Elasticsearch client created");
} catch (error) {
  console.error("Error creating Elasticsearch client:", error);
  // Create a mock client that will always fail gracefully
  elasticClient = {
    isNotAvailable: true,
    ping: async () => {
      throw new Error("Elasticsearch client not available");
    },
    search: async () => {
      throw new Error("Elasticsearch client not available");
    },
    indices: {
      exists: async () => {
        throw new Error("Elasticsearch client not available");
      },
      create: async () => {
        throw new Error("Elasticsearch client not available");
      },
    },
    bulk: async () => {
      throw new Error("Elasticsearch client not available");
    },
    info: async () => {
      throw new Error("Elasticsearch client not available");
    },
  };
}

// Test the connection
const testConnection = async () => {
  try {
    if (elasticClient.isNotAvailable) {
      console.warn(
        "Cannot test: Elasticsearch client not properly initialized"
      );
      return false;
    }

    console.log("Testing Elasticsearch connection...");
    const info = await elasticClient.ping({
      requestTimeout: 5000, // Timeout after 5 seconds
    });

    console.log("Elasticsearch ping successful");
    const clientInfo = await elasticClient.info();
    console.log(
      `Connected to Elasticsearch ${
        clientInfo.version?.number || "unknown version"
      }`
    );
    return true;
  } catch (error) {
    console.error("Elasticsearch connection test failed:", error.message);
    // Check if there's a specific connection issue and provide helpful message
    if (error.message.includes("ECONNREFUSED")) {
      console.error(
        "Elasticsearch server is not running or not accessible at the configured URL."
      );
    } else if (error.message.includes("authentication")) {
      console.error(
        "Elasticsearch authentication failed. Please check your credentials."
      );
    }
    return false;
  }
};

// Check if we should use Elasticsearch or fallback to MongoDB
const isElasticsearchAvailable = async () => {
  if (elasticClient.isNotAvailable) return false;

  try {
    await elasticClient.ping({ requestTimeout: 1000 });
    return true;
  } catch (error) {
    return false;
  }
};

export { elasticClient, testConnection, isElasticsearchAvailable };
