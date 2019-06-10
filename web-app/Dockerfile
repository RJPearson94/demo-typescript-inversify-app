FROM node:12.4.0-alpine

LABEL maintainer = "Rob Pearson"
LABEL app = "Typescript Inversify Express App"
LABEL description = "An example app to prototype Dependency Injection using Typescript & Inversify"
LABEL version = "1.0.0"

RUN adduser -D webappuser
USER webappuser

COPY dist .

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["main.js"]
