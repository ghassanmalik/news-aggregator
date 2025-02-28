# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies with Yarn
COPY package.json yarn.lock ./
RUN yarn install

# Copy all files
COPY . .

# Expose Vite's default port
EXPOSE 3000

# Start Vite with correct host binding
CMD ["yarn", "dev"]
