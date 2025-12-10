# --------------------------------------------------------------
# Dockerfile: API Proto Builder (Go + TS + Gateway + Redocly)
# --------------------------------------------------------------

FROM golang:1.24.0-bookworm

ARG PROTOBUF_VERSION
ARG PROTOC_GEN_GO_GRPC
ARG GRPC_GATEWAY_VERSION
ARG BUFBUILD_VERSION
ARG SWAGGER_VERSION

ENV CGO_ENABLED=0

RUN apt-get update && apt-get install -y \
    nodejs npm sudo libarchive-tools gettext-base jq curl \
 && rm -rf /var/lib/apt/lists/*

# --------------------------------------------------------------
# Install Go-based protoc plugins
# --------------------------------------------------------------
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@$PROTOBUF_VERSION \
 && go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@$PROTOC_GEN_GO_GRPC \
 && go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@$GRPC_GATEWAY_VERSION \
 && go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@$GRPC_GATEWAY_VERSION \
 && go install github.com/go-swagger/go-swagger/cmd/swagger@$SWAGGER_VERSION \
 && go install github.com/bufbuild/buf/cmd/buf@$BUFBUILD_VERSION \
 && npm install -g redoc-cli \
 && npm install -g ts-protoc-gen \
 && go clean --modcache --cache \
 && npm cache clean --force

# --------------------------------------------------------------
# Install protoc compiler
# --------------------------------------------------------------
RUN set -eux; \
    PROTOC_VERSION=$(curl -sL https://api.github.com/repos/protocolbuffers/protobuf/releases/latest | jq -r ".tag_name" | sed 's/^v//'); \
    ARCH=$(arch | sed 's/aarch64/aarch_64/'); \
    cd /tmp && mkdir protoc && cd protoc; \
    curl -sL "https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-${ARCH}.zip" \
        | bsdtar -xf-; \
    install -o root -g root -m 0755 bin/protoc /usr/bin/protoc; \
    rm -rf /tmp/protoc

# --------------------------------------------------------------
# User and workspace
# --------------------------------------------------------------
ARG USER=api
ARG UID=1000

RUN useradd -m -u $UID -o -s /bin/bash $USER \
 && echo "$USER ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USER \
 && mkdir /api && chown $UID /api

USER $USER
WORKDIR /api

ENV GOPATH=/home/$USER/go
