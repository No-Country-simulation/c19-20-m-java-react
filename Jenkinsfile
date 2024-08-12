pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                dir('backend/admin-server') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }
    }
}
