#DOCKERFILE

FROM node:alpine
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN ["npm", "install"]
CMD ["npm", "start"]
EXPOSE 3000