#!/bin/bash

# Start the backend API using Uvicorn on port 8000
uvicorn main:app --host 0.0.0.0 --port 8000 &

# Start NGINX to serve the frontend static files on port 80
nginx -g "daemon off;"
