# ---------- Stage 1: Build Frontend ----------
    FROM node:20 as frontend-build

    WORKDIR /frontend
    COPY frontend/package*.json ./
    RUN npm install
    COPY frontend/ .
    RUN npm run build
    
    # ---------- Stage 2: Build Backend ----------
    FROM python:3.11-slim as backend-build
    
    WORKDIR /app/backend
    
    # Install system dependencies if needed (e.g., for google-cloud packages)
    RUN apt-get update && apt-get install -y gcc && apt-get clean
    RUN apt-get update && apt-get install -y nginx && apt-get clean
    
    # Install Python dependencies
    COPY backend/requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    COPY backend/ .
    
    # ---------- Stage 3: Final Image ----------
    FROM python:3.11-slim as final
    
    WORKDIR /app
    
    # Install Uvicorn and any other necessary dependencies
    RUN pip install --no-cache-dir uvicorn
    
    # Copy the backend code and frontend build
    COPY --from=backend-build /app /app
    COPY --from=frontend-build /frontend/build /backend/static
    
    COPY backend/requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    # Set the working directory for running the FastAPI app
    WORKDIR /app/backend
    
    # Expose the application port
    EXPOSE 8000
    
    # Set the environment variable for frontend directory location
    ENV FRONTEND_DIR=/backend/static
    RUN apt-get update && apt-get install -y nginx && apt-get clean
    # Copy the entrypoint script and make it executable
    COPY entrypoint.sh /entrypoint.sh
    RUN chmod +x /entrypoint.sh
    
    # Command to run the application
    CMD ["/entrypoint.sh"]
    