FROM node:19.6.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
 
CMD ["npm", "run", "start"]