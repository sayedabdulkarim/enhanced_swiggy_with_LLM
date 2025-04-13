# Elasticsearch Setup Instructions

## Option 1: Install Elasticsearch locally

1. **Download Elasticsearch**

   - Go to https://www.elastic.co/downloads/elasticsearch
   - Download the version compatible with your OS

2. **Install and Run**

   - Extract the downloaded files
   - Navigate to the elasticsearch directory
   - Run `./bin/elasticsearch` on macOS/Linux or `.\bin\elasticsearch.bat` on Windows

3. **Verify**
   - Elasticsearch should be available at http://localhost:9200
   - Test with `curl http://localhost:9200` or by visiting in a browser

## Option 2: Use Docker

1. **Pull the Elasticsearch docker image**
