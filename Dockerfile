FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./ 
RUN npm i
RUN chown -R node:node /app/node_modules
CMD ["npm", "run", "start"]