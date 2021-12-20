FROM node:14.17.0

WORKDIR /usr/src/app/Frontend

COPY package*.json ./

RUN npm install -f 

COPY . .

#RUN npm install -g serve

#RUN npm run-script build
RUN export PORT=$PORT

#EXPOSE 3000

CMD ["npm", "start"]