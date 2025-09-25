# === STAGE 1: Build the React App ===
FROM node:18-alpine AS builder

WORKDIR /app

# Add build arguments for API URL
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL:-http://localhost:8000}

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source and build
COPY . .
RUN npm run build

# === STAGE 2: Serve the App with Nginx ===
FROM nginx:1.25-alpine

# Copy built static files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Create directory for nginx pid file
RUN mkdir -p /run/nginx

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

# Use shell form to ensure proper signal handling
CMD ["nginx", "-g", "daemon off;"]