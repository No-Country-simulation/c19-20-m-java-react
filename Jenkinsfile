pipeline {
    agent any
    stages {
        stage('Check for changes in admin-service') {
            when {
                changeset "**/admin-server/**"
            }
            steps {
                echo 'Changes detected in admin-service, proceeding with build...'
                sh './mvnw clean package -DskipTests'
                sh "nohup java -jar target/admin-service.jar > nohup.out 2>&1"
            }
        }
        stage('Skip Build') {
            when {
                not {
                    changeset "**/admin-service/**"
                }
            }
            steps {
                echo 'No changes detected in admin-service, skipping build...'
                sh './mvnw clean package -DskipTests'
                sh "nohup java -jar target/admin-service.jar > nohup.out 2>&1"
            }
        }
    }
}

