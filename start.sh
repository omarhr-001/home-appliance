#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Home Appliance Store - Development Startup${NC}\n"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Error: pnpm is not installed${NC}"
    echo "Install it with: npm install -g pnpm"
    exit 1
fi

# Check for required environment variables
echo -e "${YELLOW}Checking environment configuration...${NC}"

if [ ! -f "artifacts/home-appliance-store/.env" ]; then
    echo -e "${RED}Missing frontend .env file${NC}"
    echo "Please create artifacts/home-appliance-store/.env with:"
    echo "  VITE_SUPABASE_URL=<your-url>"
    echo "  VITE_SUPABASE_ANON_KEY=<your-key>"
    echo "  VITE_API_URL=http://localhost:3001"
    exit 1
fi

echo -e "${GREEN}✓ Frontend .env configured${NC}"
echo -e "${GREEN}✓ Environment checks passed${NC}\n"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    pnpm install
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
fi

echo -e "${GREEN}Starting development servers...${NC}"
echo -e "${YELLOW}API Server will run on: http://localhost:3001${NC}"
echo -e "${YELLOW}Frontend will run on: http://localhost:5173${NC}\n"

# Start both servers in parallel
(
    echo -e "${YELLOW}[API Server]${NC} Starting..."
    cd artifacts/api-server
    pnpm dev
) &
API_PID=$!

sleep 2

(
    echo -e "${YELLOW}[Frontend]${NC} Starting..."
    cd artifacts/home-appliance-store
    pnpm dev
) &
FRONTEND_PID=$!

# Handle graceful shutdown
trap "kill $API_PID $FRONTEND_PID 2>/dev/null" EXIT

echo -e "\n${GREEN}Both servers are running!${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop${NC}\n"

wait
