FROM node:18.13.0
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
# RUN npm install --only-production
ENV PORT=6000
EXPOSE $PORT 
CMD ["npm", "start"]
# COMD ["node", "src/index.js"]