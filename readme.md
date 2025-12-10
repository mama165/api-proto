# API Proto Builder

Generate Go, gRPC, REST (gRPC-Gateway), OpenAPI/Swagger, and TypeScript code from Protocol Buffers.

---

## Requirements

- Docker
- Go 1.24+
- Node.js & npm (for TypeScript)
- Make

---

## Project Layout

project/  
├─ proto/   
├─ generated/   
├─ docs/        
├─ buf.yaml  
├─ buf.gen.yaml  
├─ Dockerfile  
├─ Makefile  
└─ .env


---

## Quick Start

### 1. Setup Environment

```bash
make env-file 
```
This creates the .env file with the required tool versions.
### 2. Build Docker Image
```bash
make build-docker-image
```

### 3. Generate All Code (Go + TS + OpenAPI)

```bash
make all-in-docker
```

Go structs, gRPC clients/servers → generated/go

REST handlers → generated/go

OpenAPI JSON → generated/openapi

TypeScript gRPC-web → generated/ts

### 4. Optional: Serve Docs

```bash
make serve-doc-in-docker
```
Then open your browser at: http://localhost:8765
Buf Commands

```bash
buf mod update    # Update and resolve dependencies
buf lint          # Lint proto files
buf generate      # Generate code (uses local tools if available)
```

Notes

    Never edit generated/ manually.

    Docker caches speed up builds.

    Works locally and in CI/CD without installing all tools.