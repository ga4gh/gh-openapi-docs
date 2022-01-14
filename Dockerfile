# ########################################
# BUILDER IMAGE
# ########################################

FROM node:16.13.2-alpine3.14 as builder

WORKDIR /usr/src/build

RUN npm install -g pkg

# CREATE BINARY FOR OPENAPI
RUN npm install -g @redocly/openapi-cli
RUN pkg `which openapi` -o openapi

# CREATE BINARY FOR REDOC CLI
RUN npm install -g redoc-cli
RUN pkg `which redoc-cli` -o redoc-cli

# CREATE BINARY FOR GH OPENAPI DOCS
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src
COPY webpack.config.js webpack.config.js

RUN npm install
RUN npm run build
RUN pkg dist/bundle.js -o gh-openapi-docs

# ########################################
# FINAL IMAGE
# ########################################

FROM alpine:3.15

WORKDIR /usr/bin

COPY --from=builder /usr/src/build/openapi openapi
COPY --from=builder /usr/src/build/redoc-cli redoc-cli
COPY --from=builder /usr/src/build/gh-openapi-docs gh-openapi-docs

RUN apk add git

WORKDIR /docs

ENTRYPOINT [ "gh-openapi-docs" ]
