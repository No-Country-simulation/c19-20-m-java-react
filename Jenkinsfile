pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                dir('backend/admin-server') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                    sh 'tmux new-session -d -s admin_server "java -jar target/admin-server.jar"'
                }
            }
        }
    }
}
