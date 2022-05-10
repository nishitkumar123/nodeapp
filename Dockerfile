FROM node:12-slim

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json .

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

#secify the env port
ENV PORT=8080

# Expose for the connection
EXPOSE 8080

# Use tini to manage zombie processes and signal forwarding
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# Run the web service on container startup.
CMD [ "node", "index.js" ]