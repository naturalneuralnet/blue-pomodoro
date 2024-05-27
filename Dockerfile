# Need to pick a node version
# Seperate build and deploy stages, build and then deploy using nginix
FROM node:19.4-bullseye as build

# Set a workdir

WORKDIR /usr/src/app

# Copy package files first

COPY package*.json ./

# install dependencies
# use a cache mount


RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci

# copy source code

COPY . .
RUN npm run build


# deploy with nginix image

FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build usr/src/app/build/ /usr/share/nginx/html

EXPOSE 8080

# put docker on and try to run this