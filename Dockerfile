# Usa Node.js 20 para build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copia package.json e package-lock.json primeiro para otimizar cache
COPY package.json package-lock.json ./

# Instala TODAS as dependências, incluindo Prisma
RUN npm install

# Copia os arquivos restantes do projeto
COPY . .

# Copia o arquivo .env para dentro do container
COPY .env .env

# Garante que o Prisma Client seja gerado antes da build
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma db seed

# Compila o código TypeScript
RUN npm run build

# Remove dependências de desenvolvimento para reduzir a imagem final
RUN rm -rf node_modules && npm install --omit=dev

# Usa uma imagem menor para rodar a aplicação
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia os arquivos da fase de build
COPY --from=builder /usr/src/app ./

# Copia novamente o .env (caso seja necessário na runtime)
COPY --from=builder /usr/src/app/.env .env

# Expõe a porta do backend
EXPOSE 3000

# Inicia a aplicação NestJS
CMD ["node", "dist/main.js"]
