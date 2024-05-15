#!/bin/bash

# Load environment variables from .env file
# source .env

# Define your API endpoint
API_URL="$NEXT_PUBLIC_API_BASE_URL/api/website-commons?populate=favicon&filters[id][$eq]=$NEXT_PUBLIC_TENANT_ID"

# Fetch data from the API
response=$(curl -sg -H "Authorization: Bearer $TENANT_API_TOKEN" "$API_URL")

# Check if the curl command was successful
if [ $? -ne 0 ]; then
    echo "Failed to fetch data from the server."
    exit 1
fi

# Validate JSON response
if ! echo "$response" | jq -e . >/dev/null; then
    echo "Invalid JSON response from the server."
    exit 1
fi

# Extract URL of the favicon
favicon_url=$(echo "$response" | jq -r '.data[0].attributes.favicon.data.attributes.url')

# Download the favicon image with verbosity
echo "Downloading favicon from: $favicon_url"
curl -sS "$favicon_url" -o public/favicon.png 2>&1

# Check if the download was successful
if [ $? -ne 0 ]; then
    echo "Failed to download the favicon image."
    exit 1
fi

echo "Favicon downloaded successfully."
