pipeline {
    agent any
    stages {
        stage('Build') {
            
            steps {
                echo 'Building..'
                sh 'docker build -t chat-app:latest .'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'            
                sh 'docker run -p 127.0.0.1:3000:3000 -d --name chat-app-container chat-app:latest'
                sh 'npm test'
                sh 'docker stop chat-app-container'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'docker push chat-app:latest'
            }
        }
    }
}