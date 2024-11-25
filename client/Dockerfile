FROM node:20.15-alpine AS builder

# Enable pnpm
RUN corepack enable

# Go inside builder directory
WORKDIR /builder

# Copy all files that are not in .dockerignore into the WORKDIR
COPY . ./

# Install all dependencies
RUN pnpm install

# Build the project
RUN pnpm run build

FROM node:20.15-alpine

# Go inside app directory
WORKDIR /app

# Copy the build application from the previous stage
COPY --from=builder /builder/dist ./dist

# Install simple http server to server the application
# We will not use this in production (deployment) but keeping it simple for now
RUN npm install -g http-server

# Expose the port 8080 (documentation)
EXPOSE 8080

# Run the simple http server to serve the frontend
CMD [ "http-server", "dist" ]