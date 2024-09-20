FROM node:16

# Instalar dependencias adicionales para Puppeteer
RUN apt-get update && apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgbm-dev \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  lsb-release \
  xdg-utils \
  --no-install-recommends \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Instalar dependencias de Puppeteer
RUN npm install puppeteer

# Copiar archivos del proyecto
COPY . .

# Puerto para el servidor
EXPOSE 8080

# Comando de inicio
CMD ["npm", "start"]
