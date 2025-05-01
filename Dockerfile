# Stage 1: Build the app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using serve
FROM node:18-slim

RUN npm install -g serve

# Copy build artifacts
COPY --from=build /app/dist /app/dist

WORKDIR /app

EXPOSE 3000

# Serve the 'dist' folder
CMD ["serve", "-s", "dist", "-l", "3000"]
