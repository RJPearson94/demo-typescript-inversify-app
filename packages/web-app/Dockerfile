FROM node:16.10.0-alpine

LABEL maintainer = "RJPearson94"
LABEL app = "Typescript Inversify Express App"
LABEL description = "An example app to prototype Dependency Injection using Typescript & Inversify"

RUN npm install pm2@4.5.5 -g

RUN adduser -D webappuser
USER webappuser

COPY dist dist
COPY ecosystem.json .

EXPOSE 3000

ENTRYPOINT ["pm2-runtime"]
CMD ["ecosystem.json"]
