    # Base image
    FROM node:18.9.1

    # Set working directory
    WORKDIR /app

    # Copy package.json and install dependencies
    COPY package*.json ./
    RUN npm install

    # Copy the backend source code
    COPY . .

    # Expose the backend port (adjust if different)
    EXPOSE 8082

    # Start the backend server
    CMD ["node", "index.js"]
