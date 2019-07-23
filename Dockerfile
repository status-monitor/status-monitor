##############
## BUILDER
##############
FROM node:12 AS builder

# Create app directory
RUN mkdir -p /usr/built
WORKDIR /usr/built

# Cache app dependencies
# COPY .cache/package.json /usr/built/
# COPY .cache/package-lock.json /usr/built/
# RUN npm install

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy configs
COPY .babelrc ./
COPY next.config.js ./
COPY tsconfig.json /usr/built

# Bundle app source
COPY frontend /usr/built/frontend
COPY pages /usr/built/pages
COPY api /usr/built/api
RUN npm run build

##############
## RUNNER
##############
FROM node:12-alpine

# Create app directory
RUN mkdir -p /usr/built
WORKDIR /usr/built

COPY package*.json ./
RUN npm install --production
# RUN apk add --no-cache --virtual .gyp \
#         python \
#         make \
#         g++ \
#     && npm install --production \
#     && apk del .gyp

COPY --from=builder /usr/built/.next ./.next
COPY server.js /usr/built/server.js
COPY static /usr/built/static
COPY next.config.js /usr/built/next.config.js

COPY --from=builder /usr/built/dist-api ./dist-api


ENV NODE_ENV production

EXPOSE 3000
CMD npm start