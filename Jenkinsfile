pipeline {
    agent any
    stages {
        stage('Build') {
            
            steps {
                echo 'Building..'
                sh 'docker build -t chat-app:latest .'
                sh 'npm install mocha'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'docker run -p 3000:3000 -d chat-app:latest'
                sh 'npm test'
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