FROM node:18

COPY package*.json ./ 

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "weather.js" ]

