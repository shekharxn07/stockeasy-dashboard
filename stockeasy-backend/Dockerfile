# Step 1: Base Image
# Hum Node.js v18 ke ek chote aur secure version (alpine) se shuruaat kar rahe hain.
FROM node:18-alpine

# Step 2: Working Directory
# Container ke andar /app naam ka ek folder banayein aur usmein saara kaam karein.
WORKDIR /app

# Step 3: Dependencies Install Karein
# Pehle sirf package.json aur package-lock.json ko copy karein.
COPY package*.json ./
# Ab saari zaroori libraries (express, mysql2, etc.) install karein.
RUN npm install

# Step 4: App Code Copy Karein
# Ab baaki saare project ke code ko container mein copy karein.
COPY . .

# Step 5: Port Expose Karein
# Docker ko batayein ki humara app container ke andar port 8000 par chalega.
EXPOSE 8000

# Step 6: App ko Start Karein
# Jab container start hoga, toh yeh command automatically chal jayegi.
CMD [ "node", "server.js" ]