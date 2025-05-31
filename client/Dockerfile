# Base image
FROM node:18.9.1

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Fix permission issues for node_modules cache
RUN mkdir -p /app/node_modules/.cache && chmod -R 777 /app/node_modules

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port (default port for React dev server)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
