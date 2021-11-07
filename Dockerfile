#
# Build stage
#
FROM node:14.16.0 AS build

COPY src /home/app/src
COPY package*.json /home/app
COPY .babelrc /home/app

WORKDIR /home/app
RUN npm install
RUN npm run build

#
# Package stage
#
FROM node:14.16.0
COPY --from=build /home/app /usr/local/
CMD ["node", "/usr/local/dist/server.js"]
# EXPOSE 3000
