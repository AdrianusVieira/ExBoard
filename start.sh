#!/bin/bash

echo "Starting Ex Board..."

echo "Starting backend..."
cd backend && npm run start:dev &

echo "Starting frontend..."
cd ../frontend && npm run dev