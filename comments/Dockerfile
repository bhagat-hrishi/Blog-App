#Base image
FROM node:alpine 

#set working directory
WORKDIR /app

# copy package.json 
COPY package.json ./ 

RUN npm install

COPY ./ ./

# command to execute when container start
CMD ["npm","start"]