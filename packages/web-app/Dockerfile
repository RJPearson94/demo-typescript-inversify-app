FROM node:13.1.0-alpine

LABEL maintainer = "Rob Pearson"
LABEL app = "Typescript Inversify Express App"
LABEL description = "An example app to prototype Dependency Injection using Typescript & Inversify"
LABEL version = "1.0.0"

RUN npm install pm2@4.1.2 -g

RUN adduser -D webappuser
USER webappuser

COPY dist dist
COPY ecosystem.json .

EXPOSE 3000

ENTRYPOINT ["pm2-runtime"]
CMD ["ecosystem.json"]
