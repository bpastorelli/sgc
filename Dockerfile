FROM nginx:alpine



# Copia os arquivos de configuração do Nginx (opcional, mas recomendado)
COPY nginx.conf /etc/nginx/conf.d/default.conf

#Copia os arquivos de build
COPY ./src/app/dist/sgc-tres-marias/. /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
