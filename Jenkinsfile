node {
    stage('Build') {
        echo 'Building....'
        chatAppImage = docker.build("a01635715/chat-app:latest")
        sh 'npm install'
    }
    stage('Test') {
        echo 'Testing....'
        sh 'docker run -p 127.0.0.1:3000:3000 -d --name chat-app-container a01635715/chat-app:latest'
        sh 'npm test'
        sh 'docker stop chat-app-container'
        sh 'docker rm chat-app-container'
    }
    stage('Deploy') {
        echo 'Deploying....'
        docker.withRegistry('docker.io/chat-app', 'docker-login') {
            chatAppImage.push()
        }
    }
}