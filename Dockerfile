# Usa una imagen base de Node.js
FROM node:18 AS build

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY public ./public
COPY src ./src

# Instala las dependencias
RUN npm install

# Construye la aplicación
RUN npm run build

# Usa una imagen base ligera para el entorno de producción
FROM node:18-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios del contenedor de construcción
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/public ./public

# Define la variable de entorno para el puerto
ENV PORT=3000

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
