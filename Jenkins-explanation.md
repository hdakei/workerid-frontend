
# Jenkins Pipeline for Worker-ID Frontend

CI/CD of the Worker-ID Frontend application using Jenkins pipeline. 

## Pipeline Overview

This pipeline includes several stages: cloning the repository, building a Docker image, pushing the image to DockerHub and deploying the application to a Kubernetes cluster using Helm.

### Environment Variables

```groovy
environment {
    DOCKER_IMAGE = 'chinooth/workerid-frontend'
}
```

- `DOCKER_IMAGE`: This variable sets the Docker image name used throughout the pipeline.

### Stages

#### Clone Repository

```groovy
stage('Clone Repository') {
    steps {
        git 'https://github.com/hdakei/workerid-frontend'
    }
}
```

- **Purpose**: Clones the code from the GitHub repository to the Jenkins workspace to be used in any stages that need to it.

#### Build Docker Image

```groovy
stage('Build Docker Image') {
    steps {
        script {
            docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
        }
    }
}
```

- **Purpose**: Builds Docker image from the Dockerfile in the repository root.
- `${DOCKER_IMAGE}:${env.BUILD_ID}`: Tags the built image with the Jenkins build ID, allowing unique identification of each image built.

#### Push Docker Image

```groovy
stage('Push Docker Image') {
    steps {
        script {
            docker.withRegistry('https://hub.docker.com', 'dockerhub-credentials') {
                docker.image("${DOCKER_IMAGE}:${env.BUILD_ID}").push()
            }
        }
    }
}
```

- **Purpose**: Pushes the Docker image to DockerHub.
- `dockerhub-credentials`: Refers to stored credentials in Jenkins for DockerHub access.

#### Deploy to Kubernetes

```groovy
stage('Deploy to Kubernetes') {
    agent { node { label 'deployment-agent' } }
    steps {
        script {
            sh 'helm upgrade --install worker-id-app helm/worker-id --set image.tag=${env.BUILD_ID}'
        }
    }
}
```

- **Purpose**: Deploys the application to Kubernetes using Helm.
- `deployment-agent`: Specifies that this stage should run on a Jenkins agent with the label `deployment-agent`.
- `helm upgrade --install`: This command ensures that the application is either upgraded or installed if not already present.
- `--set image.tag=${env.BUILD_ID}`: Dynamically sets the image tag in the Helm chart to the Docker image built in this pipeline.

### Post Build Actions

```groovy
post {
    success {
        echo 'Deployment successful!'
    }
    failure {
        echo 'Deployment failed.'
        mail to: 'hdakei@gmail.com', subject: 'Failed Deployment', body: 'The deployment has failed. Please check the Jenkins logs for details.'
    }
}
```

- **Purpose**: Provides notifications based on the outcome of the pipeline.
- `success`: Prints a message to the console log if the pipeline completes successfully.
- `failure`: Prints an error message and send an email if the pipeline fails.
