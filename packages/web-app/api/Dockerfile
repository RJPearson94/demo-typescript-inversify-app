FROM swaggerapi/swagger-ui:v3.23.8

LABEL maintainer = "Rob Pearson"
LABEL app = "Typescript Inversify Express App API Docs"
LABEL description = "Hosted OpenAPI spec docs for Typescript Inversify Express App API"
LABEL version = "1.0.0"

RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

COPY docs /usr/share/nginx/html
ENV URL=swagger.json

EXPOSE 8080