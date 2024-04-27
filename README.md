# workerid frontend staged App with Nginx 

This repository contains a Dockerized setup for serving a React application using Nginx web server. It includes Dockerfiles, Docker Compose configuration, and Nginx configuration to build and run the React app in a Docker container.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone git@github.com:hdakei/workerid-frontend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd workerid-frontend
    ```

3. Build and run the Docker containers:

    ```bash
    docker-compose up -d --build
    ```

4. Once the containers are running, you can access the React application in your web browser at [http://localhost](http://localhost).

## Project Structure
##

The project structure is as follows:


- **docker/Dockerfile**: Dockerfile for building the React app.
    **Understanding the Dockerfile**
    
    In this Dockerfile we have multi-stage build process to optimize the final Docker image size and manage build-time dependencies. Here's how it works:
    
    **1. Build Stage (`FROM node:20-alpine as build`)**
    
    * **Base Image:** You select `node:20-alpine` as foundation. This image provides Alpine Linux (a streamlined distribution) with Node.js version 20, a suitable environment for building a Node.js application.
    * **Working Directory (`WORKDIR /app`)** Sets the working directory within the image to `/app`.
    * **Dependency Installation (`COPY ...`, `RUN npm install`)** copy the essential `package.json` and `package-lock.json` files, which define your project's dependencies. Then, `npm install` fetches and sets up those dependencies.
    * **Code Copy (`COPY . .`)** Copies entire project source code into the working directory.
    * **Build Command (`RUN npm run build`)** This command assumes the code has a `build` script defined in `package.json`. This script likely compiles, transpiles, and bundles application into production-ready assets.
    
    **2. Deployment Stage (`FROM nginx:alpine`)**
    
    * **Base Image:** Now we switch to `nginx:alpine` as the base image. This image provides a lightweight Nginx web server on Alpine Linux.
    * **Deployment (`COPY --from=build ...`)** Selectively copy the results of our build (`/app/build` within the 'build' stage) into the Nginx web server's document root (`/usr/share/nginx/html`).
    * **Exposure and Launch (`EXPOSE 80`, `CMD ...`)** Exposes port 80 and specifies the command to start Nginx in the foreground.
##

- **docker-compose.yml**: Docker Compose configuration for defining services.

    * **version: '3'**: This specifies the version of the Docker Compose file format. Version 3 is a commonly used and well-supported format.
    * **services:** Defines a list of services (containers) that work together as part of your application.
        * **workerid-app:** This is the name of the specific service being defined.
            * **build:** Instructions for building the Docker image for this service.
                * **context: .**  The 'context' specifies the directory containing the Dockerfile and other build resources. The '.' indicates the current directory.
                * **dockerfile: docker/app/Dockerfile**  The path to the Dockerfile, which contains the actual instructions for building the image.
            * **ports:**  Configures port mapping.
                * **"8080:80"**: This tells Docker to map port 8080 on the host machine to port 80 inside the container. That means we can access the app via  http://localhost:8080 on your web browser.

- **src/**: React application source code.
    -
## Customize Configuration

- **nginx.conf**: Update this file to modify Nginx server configuration.
- **docker-compose.yml**: Adjust Docker Compose configuration as needed.

## Contributing

If you find any issues with the project or have suggestions for improvements, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the [MIT License](LICENSE).

