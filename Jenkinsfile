pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                dir('admin-service') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }
    }
}
