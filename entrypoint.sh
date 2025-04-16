#!/bin/bash

# Start Uvicorn in background
uvicorn main:app --host 0.0.0.0 --port 5000 &

# Start Nginx in foreground
nginx -g "daemon off;"