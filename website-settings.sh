#!/bin/bash
# Assuming LOCATIONS_PATH is set in your environment or .env file

# Define the current and new folder paths
CURRENT_FOLDER="./src/app/[locale]/locations"
NEW_FOLDER="./src/app/[locale]/$NEXT_PUBLIC_LOCATIONS_PATH"

# Check if NEW_FOLDER_NAME is not empty
if [ -z "$NEXT_PUBLIC_LOCATIONS_PATH" ]; then
    echo "The NEXT_PUBLIC_LOCATIONS_PATH environment variable is not set."
    exit 1
fi

# Rename the folder
if [ -d "$CURRENT_FOLDER" ]; then
    mv "$CURRENT_FOLDER" "$NEW_FOLDER"
    echo "Folder has been renamed to: $NEW_FOLDER"
else
    echo "The folder $CURRENT_FOLDER does not exist."
    exit 1
fi