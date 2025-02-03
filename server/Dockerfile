FROM node:20.15-alpine AS builder

# Enable pnpm
RUN npm install -g corepack@latest
RUN corepack enable

# Go inside app directory
WORKDIR /builder

# Copy all files that are not in .dockerignore into the WORKDIR
COPY . ./

# Install all dependencies
RUN pnpm install

# Build the project
RUN pnpm run build

# Remove all dev dependencies
RUN pnpm prune --prod

FROM node:20.15-alpine

# Go inside the app directory
WORKDIR /server

# Copy built files that are necessary
COPY --from=builder /builder/dist ./dist
COPY --from=builder /builder/node_modules ./node_modules
COPY package.json .

# Run the build
CMD [ "node", "dist" ]
