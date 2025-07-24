# Use the official Node.js 18 image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose port 3003
EXPOSE 3003

# Start the service
CMD ["node", "app.js"]
