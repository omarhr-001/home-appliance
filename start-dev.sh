#!/bin/bash

echo "Installing dependencies..."
pnpm install

echo ""
echo "=========================================="
echo "Home Appliance Store - Development Mode"
echo "=========================================="
echo ""
echo "Frontend will be available at: http://localhost:5173"
echo "Backend will be available at: http://localhost:3001"
echo "API Health Check: http://localhost:3001/api/health"
echo ""
echo "Starting services..."
echo ""

pnpm dev
