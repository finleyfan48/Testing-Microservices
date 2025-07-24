# Install Node
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the package files first (cache boost)
COPY package*.json ./

# Install dev dependencies (not just production)
RUN npm ci

# Copy everything else
COPY . .

RUN npm run build

# Expose the dev server port
EXPOSE 3000

# Run dev server
CMD ["npm", "run", "dev", "start"]
