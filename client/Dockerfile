FROM node:20.15-alpine AS builder

# Enable pnpm
RUN npm install -g corepack@latest
RUN corepack enable

# Go inside builder directory
WORKDIR /builder

# Copy all files that are not in .dockerignore into the WORKDIR
COPY . ./

# Install all dependencies
RUN pnpm install

# Build the project
RUN pnpm run build

FROM nginx:stable-alpine

# Copy the build application from the previous stage to the Nginx container
COPY --from=builder /builder/dist /usr/share/nginx/html

# Expose the port 80 (documentation)
EXPOSE 80
