#!/bin/bash

# Load environment variables from .env file
# source .env

# Define your API endpoint
API_URL="$NEXT_PUBLIC_API_BASE_URL/api/tenants?fields[0]=redirects&fields[1]=styles&filters[id][$eq]=$NEXT_PUBLIC_TENANT_ID"

# Define the path to your JSON file
FILE_STYLES="./settings/styles.json"
FILE_REDIRECTS="./settings/redirects.json"

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

# Save the JSON responses to the file
echo "$response" | jq '.data[0].attributes.styles' > "$FILE_STYLES"
echo "$response" | jq '.data[0].attributes.redirects' > "$FILE_REDIRECTS"