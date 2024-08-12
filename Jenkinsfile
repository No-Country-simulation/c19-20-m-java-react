pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                dir('backend/admin-server') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                    sh 'nohup java -jar target/admin-server.jar > /dev/null 2>&1 &'
                }
            }
        }
    }
}
