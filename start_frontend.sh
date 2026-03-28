#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/frontend"

echo "Installing dependencies..."
npm install

echo ""
echo "Starting Frontend..."
echo "Frontend will be available at: http://localhost:3000"
echo ""

npm run dev
