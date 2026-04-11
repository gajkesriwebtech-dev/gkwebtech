# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Build the React/Vite application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy out custom Nginx configuration to enforce 301 redirects and SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from the build stage into the Nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000 (Expected by Dokploy config)
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
