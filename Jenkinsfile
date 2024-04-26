pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'chinooth/workerid-frontend'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/hdakei/workerid-frontend'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://hub.docker.com', 'dockerhub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_ID}").push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            agent { node { label 'deployment-agent' } }
            steps {
                script {
                    sh 'helm upgrade --install worker-id-app helm/worker-id --set image.tag=${env.BUILD_ID}'
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
            mail to: 'hdakei@gmail.com', subject: 'Failed Deployment', body: 'The deployment has failed. Please check the Jenkins logs for details.'
        }
    }
}
