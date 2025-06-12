# Emirates Tax Platform Frontend Deployment Guide

This document provides comprehensive instructions for deploying the Emirates Tax Platform frontend application in both development and production environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Development Deployment](#development-deployment)
- [Production Deployment](#production-deployment)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- Node.js (v16.x or higher)
- npm (v8.x or higher)
- Git

### Required Access
- Access to the project repository
- Access to deployment environments
- Required environment variables and API keys

## Development Deployment

### 1. Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies with legacy peer deps due to chart library conflicts
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Create a `.env.development` file in the frontend root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_VERSION=v1
VITE_APP_NAME=Emirates Tax Platform
VITE_APP_ENV=development
```

### 3. Running Development Server

```bash
# Start development server
npm run dev

# The application will be available at http://localhost:3000
```

### 4. Development Build (Optional)

```bash
# Create development build
npm run build:dev

# Preview development build
npm run preview
```

## Production Deployment

### 1. Environment Setup

Create a `.env.production` file in the frontend root directory:

```env
VITE_API_BASE_URL=https://api.emiratestax.com
VITE_API_VERSION=v1
VITE_APP_NAME=Emirates Tax Platform
VITE_APP_ENV=production
```

### 2. Building for Production

```bash
# Clean previous builds
npm run clean

# Create production build
npm run build

# The build output will be in the 'dist' directory
```

### 3. Production Deployment Options

#### Option 1: Static Hosting (Recommended)

Deploy the contents of the `dist` directory to your static hosting service (e.g., AWS S3, Netlify, Vercel).

```bash
# Example: Deploy to AWS S3
aws s3 sync dist/ s3://your-bucket-name --delete
```

#### Option 2: Docker Deployment

```dockerfile
# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run the Docker container:

```bash
# Build Docker image
docker build -t emirates-tax-frontend:latest .

# Run Docker container
docker run -d -p 80:80 emirates-tax-frontend:latest
```

### 4. Nginx Configuration

Create `nginx.conf` for production:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy configuration
    location /api/ {
        proxy_pass https://api.emiratestax.com;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Configuration

### Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API base URL | http://localhost:8000 |
| VITE_API_VERSION | API version | v1 |
| VITE_APP_NAME | Application name | Emirates Tax Platform |
| VITE_APP_ENV | Environment name | development |

### Feature Flags

| Flag | Description | Default |
|------|-------------|---------|
| VITE_ENABLE_ANALYTICS | Enable analytics tracking | false |
| VITE_ENABLE_MOCK_API | Enable mock API responses | false |

## Troubleshooting

### Common Issues

1. **Dependency Conflicts**
   ```bash
   # If you encounter peer dependency issues
   npm install --legacy-peer-deps
   ```

2. **Build Failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules
   npm install --legacy-peer-deps
   ```

3. **Runtime Errors**
   - Check browser console for errors
   - Verify environment variables are correctly set
   - Ensure API endpoints are accessible

### Health Checks

Monitor the following endpoints for application health:

- `/health` - Basic application health check
- `/api/health` - API connectivity check

### Logging

In production, logs are available through:

1. Browser console (client-side errors)
2. Nginx access and error logs
3. Application monitoring service (if configured)

### Support

For deployment issues:
- Create a support ticket at support@emiratestax.com
- Check the [troubleshooting guide](./TROUBLESHOOTING.md)
- Contact the DevOps team

---

## Security Considerations

1. Always use HTTPS in production
2. Implement proper CSP headers
3. Regular security audits
4. Keep dependencies updated
5. Monitor for vulnerabilities using `npm audit`

## Performance Optimization

1. Enable Gzip compression
2. Configure proper caching headers
3. Use CDN for static assets
4. Implement lazy loading for routes
5. Monitor performance metrics

## Backup and Recovery

1. Maintain backup of environment configurations
2. Document rollback procedures
3. Keep previous deployment artifacts
4. Regular backup testing

---

For additional support or questions, contact the DevOps team or refer to the internal documentation. 