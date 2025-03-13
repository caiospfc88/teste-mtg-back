# Backend - Teste MTG Back-end

Este é o backend do projeto **teste-mtg-back**, desenvolvido com **NestJS**, **Prisma ORM** e **PostgreSQL**.

## Tecnologias

- [NestJS](https://nestjs.com/) - Framework para Node.js
- [Prisma ORM](https://www.prisma.io/) - ORM para manipulação do banco de dados
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Docker](https://www.docker.com/) - Gerenciamento de containers

## Como rodar o projeto

### 1️⃣ Clonar o repositório

git clone https://github.com/seu-usuario/seu-repositorio.git
cd backend

### 2️⃣ Configurar variáveis de ambiente

Criar o arquivo .env na raiz do projeto e criar a varavel de ambiente com as informções abaixo:
DATABASE_URL=postgresql://postgres:rootpass2025@localhost:5432/mtg_teste?schema=public

### 3️⃣ Subir o ambiente com Docker

docker-compose up --build

### 4️⃣ Acessar a API

Após subir o projeto, a API estará disponível em:

http://localhost:3000

📝 Rotas principais
Método Rota Descrição
GET /users Lista todos os usuários
POST /users Cria um novo usuário
GET /groups Lista todos os grupos
POST /groups Cria um novo grupo
