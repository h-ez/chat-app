pipeline {
    agent any
    stages {
        stage('Build') {
            
            steps {
                echo 'Building..'
                sh 'docker build -t a01635715/chat-app:latest .'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'            
                sh 'docker run -p 127.0.0.1:3000:3000 -d --name chat-app-container a01635715/chat-app:latest'
                sh 'npm test'
                sh 'docker stop chat-app-container'
                sh 'docker rm chat-app-container'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'docker push a01635715/chat-app:latest'
            }
        }
    }
}