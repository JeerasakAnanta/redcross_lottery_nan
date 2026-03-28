#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/backend"

echo "Installing dependencies with uv..."
uv sync

echo ""
echo "Starting Backend API..."
echo "API will be available at: http://localhost:8000"
echo "Swagger docs: http://localhost:8000/docs"
echo ""

uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
