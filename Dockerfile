# ---------- Stage 1: Build Frontend ----------
    FROM node:18-alpine as frontend-build
    WORKDIR /frontend
    COPY frontend/package*.json ./
    RUN npm install
    COPY frontend/ .
    RUN npm run build
    
    # ---------- Stage 2: Build Backend ----------
    FROM python:3.11-slim as backend-build
    WORKDIR /app
    COPY backend/requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    COPY backend/ .
    
    # ---------- Stage 3: Final Image ----------
    FROM nginx:stable-alpine as final
    
    # Install Python & Uvicorn
    RUN apk add --no-cache python3 py3-pip bash curl
    COPY --from=backend-build /app /app
    COPY --from=frontend-build /frontend/build /usr/share/nginx/html
    RUN pip install --no-cache-dir uvicorn --break-system-packages uvicorn
    
    # Set working directory
    WORKDIR /app
    
    # Copy the entrypoint script
    COPY entrypoint.sh /entrypoint.sh
    RUN chmod +x /entrypoint.sh
    
    EXPOSE 80 5000
    
    CMD ["/entrypoint.sh"]
    