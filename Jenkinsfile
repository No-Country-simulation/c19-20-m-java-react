pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                dir('backend/admin-server') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                    sh 'chmod +x nohup.sh'
                    sh 'nohup.sh'
                    sh 'java -jar target/admin-server.jar > nohup.out 2>&1 & disown'
                }
            }
        }
    }
}