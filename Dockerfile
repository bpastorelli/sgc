FROM nginx:alpine

#COPY ./src/app/dist/sgc-tres-marias/. /usr/share/nginx/html
COPY ./src/app/dist/sgc-tres-marias/index.html /usr/share/nginx/html/index.html
