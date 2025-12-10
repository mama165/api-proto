# Configuration
SRC_OUT_DIR := generated
DOC_OUT_DIR := openapi
ENV_FILE := .env
PORT := 8765

ifndef BASE_DIR
  BASE_DIR := $(shell pwd)
endif

API_BASE_URL ?= localhost
API_VERSION ?= 0.0.0-dev.$(shell date +%Y%m%d%H%M%S)+$(shell git rev-parse --short HEAD)

include $(ENV_FILE)

all: buf-update lint gen-go gen-ts gen-doc

buf-update:
	buf dep update

all-in-docker: build-docker-image
	docker run --rm \
      -v /mnt/c/Users/Maël/Desktop/develop/api-proto:/workspace \
      -v go_pkg_cache:/go/pkg \
      -v go_build_cache:/go/.cache/go-build \
      -v buf_cache:/go/.cache/buf \
      --workdir /workspace \
      -e PATH=/workspace/node_modules/.bin:/go/bin:/usr/local/bin:/usr/bin \
      api-proto /bin/bash -c "make all-no-docker"

# Nouvelle cible qui ne fait pas appel à docker pour éviter boucle infinie
all-no-docker: buf-update lint gen-go gen-ts gen-doc

build-docker-image:
	docker build \
	  --build-arg PROTOBUF_VERSION=$(PROTOBUF_VERSION) \
	  --build-arg PROTOC_GEN_GO_GRPC=$(PROTOC_GEN_GO_GRPC) \
	  --build-arg GRPC_GATEWAY_VERSION=$(GRPC_GATEWAY_VERSION) \
	  --build-arg BUFBUILD_VERSION=$(BUFBUILD_VERSION) \
	  --build-arg SWAGGER_VERSION=$(SWAGGER_VERSION) \
	  -t api-proto .

lint:
	buf dep update
	buf lint

gen-go:
	rm -rf $(SRC_OUT_DIR)/go
	buf generate --template buf.gen.yaml

gen-ts:
	rm -rf $(SRC_OUT_DIR)/ts
	# Installer TS plugins localement
	#npm install --save-dev ts-protoc-gen@0.15.0 google-protobuf grpc-web
	buf generate --template buf.gen.ts.yaml

gen-doc:
	rm -rf $(SRC_OUT_DIR)/openapi
	buf generate --template buf.gen.openapi.yaml

	redoc-cli build -o $(DOC_OUT_DIR)/index.html \
	  $(SRC_OUT_DIR)/openapi/api.swagger.json

serve-doc-in-docker: all-in-docker
	docker run --rm -p $(PORT):80 \
	  -v $(BASE_DIR)/docs:/usr/share/nginx/html:ro \
	  nginx:alpine
