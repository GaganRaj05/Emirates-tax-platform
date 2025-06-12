# Stage 1: Dependencies
FROM node:20-alpine AS deps

# Set working directory
WORKDIR /deps

# Install dependencies for node-gyp and other build tools
RUN apk add --no-cache python3 make g++ git

# Copy package files
COPY package*.json ./

# Install dependencies with specific npm version
RUN npm install -g npm@10.8.2 && \
    npm install --legacy-peer-deps && \
    npm cache clean --force

# Stage 2: Development environment
FROM node:20-alpine AS development

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /deps/node_modules ./node_modules
COPY --from=deps /deps/package*.json ./

# Set development environment
ENV NODE_ENV=development

# The application code will be mounted as a volume in development
CMD ["npm", "run", "dev"]

# Stage 3: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /deps/node_modules ./node_modules
COPY --from=deps /deps/package*.json ./

# Copy source code
COPY . .

# Set build arguments
ARG VITE_API_URL
ARG VITE_APP_ENV
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_APP_ENV=${VITE_APP_ENV}

# Build the application
RUN npm run build

# Stage 4: Production
FROM nginx:alpine AS production

# Install security updates and remove unnecessary files
RUN apk update && \
    apk upgrade && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

# Create nginx user if it doesn't exist
RUN adduser -D -H -u 101 -s /sbin/nologin nginx

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Add security headers
RUN echo "add_header X-Frame-Options 'SAMEORIGIN';" >> /etc/nginx/conf.d/default.conf && \
    echo "add_header X-Content-Type-Options 'nosniff';" >> /etc/nginx/conf.d/default.conf && \
    echo "add_header X-XSS-Protection '1; mode=block';" >> /etc/nginx/conf.d/default.conf && \
    echo "add_header Content-Security-Policy \"default-src 'self';\";" >> /etc/nginx/conf.d/default.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 