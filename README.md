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

4. Once the containers are running, you can access the React application in your web browser at [http://localhost:8080](http://localhost:8080).

## Project Structure

The project structure is as follows:


- **docker/Dockerfile**: Dockerfile for building the React app.
- **docker-compose.yml**: Docker Compose configuration for defining services.
- **src/**: React application source code.

## Customize Configuration

If you need to customize the Nginx configuration or other settings, you can modify the following files:

- **nginx.conf**: Update this file to modify Nginx server configuration.
- **docker-compose.yml**: Adjust Docker Compose configuration as needed.

## Contributing

If you find any issues with the project or have suggestions for improvements, feel free to open an issue or submit a pull request. Contributions are welcome!

## License

This project is licensed under the [MIT License](LICENSE).

