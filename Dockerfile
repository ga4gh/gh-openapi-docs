FROM node:14.17.4-alpine3.14

RUN apk add git

RUN npm install -g @redocly/openapi-cli
RUN npm install -g redoc-cli
RUN npm install -g @ga4gh/gh-openapi-docs@0.2.2-rc3

WORKDIR /docs

ENTRYPOINT [ "gh-openapi-docs" ]
