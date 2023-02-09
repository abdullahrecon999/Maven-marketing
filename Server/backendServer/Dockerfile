FROM node:19-buster-slim

LABEL maintainer="Maven Marketing"
LABEL version="1.0"
LABEL description="This is the backend server for the Maven Marketing website."

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]