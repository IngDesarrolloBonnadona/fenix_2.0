# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Copy the .env and .env.development files
#COPY .env .env.development ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3003

# Start the server using the production build
CMD ["npm", "run", "start"]

#sudo docker build -t fenix-back-[version] .
#sudo docker run -p 3001:3001 fenix-back-[version]

#sudo docker build -t fenix-back:1.0.0 .
#sudo docker run -p 3003:3003 fenix-back:1.0.0

#we need to change the app PORT in mainTS when we Deploy