pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                dir('backend/admin-server') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                    sh 'nohup java -jar target/admin-server.jar > ../admin-server.log 2>&1 &'
                }
            }
        }
    }
}
