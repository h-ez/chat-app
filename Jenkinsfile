// pipeline {
//     agent any
//     stages {
//         stage('Build') {
            
//             steps {
//                 echo 'Building..'
//                 sh 'docker build -t a01635715/chat-app:latest .'
//                 sh 'npm install'
//             }
//         }
//         stage('Test') {
//             steps {
//                 echo 'Testing..'            
//                 sh 'docker run -p 127.0.0.1:3000:3000 -d --name chat-app-container a01635715/chat-app:latest'
//                 sh 'npm test'
//                 sh 'docker stop chat-app-container'
//                 sh 'docker rm chat-app-container'
//             }
//         }
//         stage('Deploy') {
//             environment {
//                 DOCKER_REGS = credentials('docker-login')
//             }

//             steps {
//                 echo 'Deploying....'
//                 sh 'docker login -u $DOCKER_REGS_USR -p $DOCKER_REGS_PSW docker.io'
//                 sh 'docker push a01635715/chat-app:latest'
//             }
//         }
//     }
// }

node {
    stage('Build') {
        echo 'Building....'
        // sh 'docker build -t a01635715/chat-app:latest .'
        def chatAppImage = docker.build("a01635715/chat-app:latest")
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
        // withEnv(["DOCKER_REGS=credentials('docker-login')"]) {
        //     sh 'mvn -B verify'
        // }

        chatAppImage.push()
    }
}