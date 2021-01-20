FROM mcr.microsoft.com/playwright:bionic

USER root
RUN apt-get update && apt-get -y install git
RUN npm install -g yarn
RUN curl -L -O 'https://github.com/FiloSottile/mkcert/releases/download/v1.4.1/mkcert-v1.4.1-linux-amd64'
RUN chmod +x ./mkcert-v1.4.1-linux-amd64
RUN ./mkcert-v1.4.1-linux-amd64  -install
RUN mkdir /root/.certs
RUN ./mkcert-v1.4.1-linux-amd64 -key-file /root/.certs/key.pem -cert-file /root/.certs/cert.pem "*.test" localhost
