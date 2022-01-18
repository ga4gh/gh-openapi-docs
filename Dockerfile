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
# RUN npm install -g redoc-cli
# RUN echo "HELLO FOO"
# RUN which redoc-cli
# RUN find / -name redoc.standalone.js
# RUN pkg `which redoc-cli` -o redoc-cli

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

# FROM alpine:3.15
FROM node:16.13.2-alpine3.14

WORKDIR /usr/local/bin

COPY --from=builder /usr/src/build/openapi openapi
COPY --from=builder /usr/src/build/gh-openapi-docs gh-openapi-docs

# COPY --from=builder /usr/local/bin/redoc-cli redoc-cli
# COPY --from=builder /usr/local/lib/node_modules/redoc-cli /usr/local/lib/node_modules/redoc-cli

RUN npm install -g redoc-cli

RUN apk add git

WORKDIR /docs

RUN which openapi
RUN which redoc-cli
RUN which gh-openapi-docs
RUN ls -la /usr/local/lib/node_modules/redoc-cli/node_modules/redoc/bundles/redoc.standalone.js

ENTRYPOINT [ "gh-openapi-docs" ]
