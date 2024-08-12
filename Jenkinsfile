pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                dir('backend/admin-server') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                    sh 'chmod +x start-admin-server.sh'
                    sh './start-admin-server.sh'
                }
            }
        }
    }
}
