# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
