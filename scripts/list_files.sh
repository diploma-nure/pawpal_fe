#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: $0 <directory_path>"
    echo "Example: $0 /home/user/documents"
    exit 1
}

# Check if directory argument is provided
if [ $# -eq 0 ]; then
    echo "Error: No directory specified"
    usage
fi

DIR="$1"

# Check if the provided path exists and is a directory
if [ ! -d "$DIR" ]; then
    echo "Error: '$DIR' is not a valid directory"
    exit 1
fi

# Check if directory is readable
if [ ! -r "$DIR" ]; then
    echo "Error: Cannot read directory '$DIR' (permission denied)"
    exit 1
fi

echo "Listing all files in directory: $DIR"
echo "----------------------------------------"

# Method 1: Using find command with excluded directories (recommended)
find "$DIR" -type f \
    -not -path "*/.next/*" \
    -not -path "*/.idea/*" \
    -not -path "*/node_modules/*" \
    -not -path "*/.git/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -not -path "*/.vscode/*" \
    -not -path "*/coverage/*" \
    -not -path "*/.nyc_output/*" \
    -not -path "*/target/*"
