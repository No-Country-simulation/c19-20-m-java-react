pipeline {
    agent any
    stages {
        stage('Build and Deploy Microservices') {
            steps {
                script {
                    def services = ['admin-server']
                    
                    services.each { service ->
                        dir("backend/${service}") {
                            sh 'chmod +x mvnw'
                            sh './mvnw clean package -DskipTests'
                            sh "java -jar target/${service}.jar &"
                        }
                    }
                }
            }
        }
    }
}
