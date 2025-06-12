#!/bin/bash

# Install required dependencies
npm install --legacy-peer-deps axios openapi-types

# Optional: Install type definitions for better TypeScript support
npm install --legacy-peer-deps --save-dev @types/axios 