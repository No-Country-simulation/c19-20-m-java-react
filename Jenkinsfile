pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                dir('backend/admin-server') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                    sh 'nohup java -jar target/admin-server.jar > nohup.out 2>&1 &'
                    sh 'sleep 15'
                    sh 'cat nohup.out'
                }
            }
        }
    }
}