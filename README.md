# CS1660 Final Project – Group 1

This repository contains the final project for CS1660, developed by Group 1.

The project features a full-stack web application with a React frontend and a Python API backend, containerized using Docker.

This project utilizes Google Cloud Platform (GCP) to fulfill the functionalities of the website. The following GCP features are used:

- **Firestore**: Used as the primary NoSQL database to store user information

- **Cloud Storage**: Handles note file uploads

- **Google Authentication (OAuth 2.0)**: Enables secure user login with Google accounts via Firebase Auth integration.

- **Artifact Registry**: Stores and manages container images securely, integrated with CI/CD pipelines for seamless deployment.

- **Cloud Run**: Hosts both frontend and backend as containerized applications, auto-scaled based on traffic.

- **CI/CD Pipeline (GitHub Actions)**: Automates testing, container builds, and deployment to Cloud Run on every push to the main branch.

## 📁 Project Structure

```
cs1660-final-group1/
├── backend/               # FASTAPI backend application
├── frontend/              # React frontend application
├── .github/workflows/     # GitHub Actions workflows
├── Dockerfile             # Dockerfile for containerizing the application
├── docker-compose.yml     # Docker Compose configuration
├── entrypoint.sh          # Entry point script for Docker container
├── adc.json               # ADC configuration file
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/) installed

### Installation and local run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/maxm-akins/cs1660-final-group1.git
   cd cs1660-final-group1
   ```

2. **Build and run the application using Docker Compose:**

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**

   - Frontend: [http://localhost:8000](http://localhost:8000)
   - Backend API: [http://localhost:3000](http://localhost:3000)

## 🧪 Running Tests

_Instructions for running tests will be added here once test suites are implemented._

## 📦 Deployment

_Deployment instructions will be provided here, detailing how to deploy the application to a production environment._

## 🤔 Comments and Considerations

_Ways the app might be changed or utilized differently given a more professional and official production_

## 👥 Contributors

- [maxm-akins](https://github.com/maxm-akins)
- [samarohan](https://github.com/samarohan)
- [nLininger](https://github.com/nLininger)
- [ethannerone](https://github.com/ethannerone)
