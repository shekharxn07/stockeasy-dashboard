# === STAGE 1: Build the React App ===
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# === STAGE 2: Serve the App with Nginx ===
FROM nginx:1.25-alpine

# Builder stage se 'build' folder ko Nginx ke web server folder mein copy karein
COPY --from=builder /app/build /usr/share/nginx/html

# Nayi nginx configuration file ko copy karein
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Docker ko batayein ki container port 80 par sunega
EXPOSE 80

# Nginx ko start karein
CMD ["nginx", "-g", "daemon off;"]