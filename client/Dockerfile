# Base image
FROM node:18.9.1

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (default port for React dev server)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
