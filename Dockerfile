# Use Node.js base image
FROM node:18-alpine

# Set working directory for frontend
WORKDIR /app

# Copy all files
COPY . .

# Install frontend dependencies
RUN npm install

# Move into backend and install backend dependencies
WORKDIR /app/backend
RUN npm install

# Set back to root for CMD
WORKDIR /app

# Install nodemon globally
RUN npm install -g nodemon

# Expose ports
EXPOSE 5173
EXPOSE 5001

# Start both servers
CMD ["sh", "-c", "cd backend && nodemon server.js & cd .. && npm run dev"]
