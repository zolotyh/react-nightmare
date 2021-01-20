#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

if [ -n "${CI:-}" ]; then
  echo "✅ Applilcation is running on CI server. Cert's folder should't be created\n" && exit 0
fi


[ -d "./.certs" ] && echo "✅ .certs folder is already exist. Skipping ssl keys creation \n" && exit 0

if ! command -v mkcert &> /dev/null
then
  echo "⚠️  Can't find mkcert in you PATH. Pleace install it or specify your PATH variable \n"
  echo "ℹ️  Visit to get more info https://github.com/FiloSottile/mkcert \n\n"
  echo "opening..."
  open "https://github.com/FiloSottile/mkcert"
  exit 1
fi

# install mkcert, requires root password to install root cert
mkcert --install
mkdir ./.certs
cd .certs && mkcert -key-file key.pem -cert-file cert.pem "*.test" localhost

