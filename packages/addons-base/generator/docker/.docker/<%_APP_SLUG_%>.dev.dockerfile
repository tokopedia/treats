FROM node:8-slim

WORKDIR /var/www/<%_APP_SLUG_%>
COPY package.json ./
RUN npm i --no-cache git
COPY . ./

ADD files/etc /etc
ADD files/var /var

CMD ["yarn","start"]

EXPOSE 3000 3001 80
