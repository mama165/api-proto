# --------------------------------------------------------------
# Dockerfile: API Proto Builder (Go + TS + Gateway + Redocly)
# --------------------------------------------------------------

FROM golang:1.24.0-bookworm

# --------------------------
# Arguments de versions
# --------------------------
ARG PROTOBUF_VERSION
ARG PROTOC_GEN_GO_GRPC
ARG GRPC_GATEWAY_VERSION
ARG BUFBUILD_VERSION
ARG SWAGGER_VERSION

# --------------------------
# Variables d'environnement
# --------------------------
ENV CGO_ENABLED=0
ENV GOPATH=/go
ENV PATH="$PATH:/go/bin"
ENV BUF_CACHE_DIR=/go/.cache/buf

# --------------------------
# Installer dépendances système
# --------------------------
RUN apt-get update && apt-get install -y \
      nodejs npm make libarchive-tools gettext-base jq curl unzip \
    && rm -rf /var/lib/apt/lists/*

# --------------------------
# Installer protoc
# --------------------------
RUN set -eux; \
    PROTOC_VERSION=$(curl -sL https://api.github.com/repos/protocolbuffers/protobuf/releases/latest \
        | jq -r ".tag_name" | sed 's/^v//'); \
    ARCH=$(arch | sed 's/aarch64/aarch_64/'); \
    cd /tmp && mkdir protoc && cd protoc; \
    curl -sL "https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-${ARCH}.zip" \
       -o protoc.zip; \
    unzip protoc.zip; \
    install -o root -g root -m 0755 bin/protoc /usr/bin/protoc; \
    rm -rf /tmp/protoc

# --------------------------
# Installer plugins Go + buf + TS / Swagger / Redoc
# --------------------------
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@$PROTOBUF_VERSION \
 && go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@$PROTOC_GEN_GO_GRPC \
 && go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@$GRPC_GATEWAY_VERSION \
 && go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2@$GRPC_GATEWAY_VERSION \
 && go install github.com/go-swagger/go-swagger/cmd/swagger@$SWAGGER_VERSION \
 && go install github.com/bufbuild/buf/cmd/buf@$BUFBUILD_VERSION \
 # Redoc CLI global
 && npm install -g redoc-cli \
 # Outils TypeScript / gRPC-web locaux
 && mkdir -p /workspace \
 && cd /workspace \
 && npm init -y \
 && npm install -g ts-protoc-gen@0.15.0 google-protobuf grpc-web protoc-gen-js \
 # Nettoyage caches
 && go clean --modcache --cache \
 && npm cache clean --force

# Ajouter le dossier node_modules/.bin au PATH pour que buf trouve les plugins TS/JS
ENV PATH=/workspace/node_modules/.bin:/usr/local/bin:$PATH

# --------------------------
# Copier le projet et préparer Buf
# --------------------------
WORKDIR /workspace
COPY . /workspace

# Marquer /workspace comme safe directory pour Git
RUN git config --global --add safe.directory /workspace

RUN buf dep update

# --------------------------
# Par défaut, juste ouvrir un shell (ou Makefile fera le reste)
# --------------------------
CMD ["/bin/sh"]
