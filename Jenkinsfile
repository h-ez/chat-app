pipeline {
    environment {
        registry = "a01635715/chat-app"
        registryCredential = 'docker-login'
        chatAppImage = ''
    }
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building....'
                script {
                    chatAppImage = docker.build registry + ":$BUILD_NUMBER"
                }
                sh 'npm install'
            }
        }
        stage('Test') {
            steps{
                echo 'Testing....'
                sh 'docker run -p 127.0.0.1:3000:3000 -d --name chat-app-container a01635715/chat-app:latest'
                sh 'npm test'
                sh 'docker stop chat-app-container'
                sh 'docker rm chat-app-container'
            }
        }
        stage('Deploy') {
            steps{
                echo 'Deploying....'
                script {
                    docker.withDockerRegistry( '', registryCredential ) {
                        chatAppImage.push('latest')
                    }
                }
            }
        }
        stage('Cleaning up') {
            steps{
                echo 'Cleaning up....'
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}