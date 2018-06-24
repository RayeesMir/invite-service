FROM node:carbon

RUN mkdir invite
WORKDIR invite

COPY package.json /invite

RUN npm install

COPY . /invite

EXPOSE 3000

CMD [ "npm", "test" ]
CMD [ "npm", "start" ]