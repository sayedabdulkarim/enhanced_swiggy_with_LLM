import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";

dotenv.config();

// Create and configure Elasticsearch client
const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "elastic",
    password: process.env.ELASTICSEARCH_PASSWORD || "",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Test the connection
const testConnection = async () => {
  try {
    const info = await elasticClient.info();
    console.log("Elasticsearch connection successful");
    console.log(`Connected to Elasticsearch ${info.version.number}`);
    return true;
  } catch (error) {
    console.error("Elasticsearch connection error:", error);
    return false;
  }
};

export { elasticClient, testConnection };
