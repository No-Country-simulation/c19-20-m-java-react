pipeline {
    agent any
    stages {
        stage('Build and Deploy Microservices') {
            steps {
                script {
                    def services = ['admin-server-0.0.1-SNAPSHOT']
                    
                    services.each { service ->
                        dir("backend/${service}") {
                            sh 'chmod +x mvnw'
                            sh './mvnw clean package -DskipTests'
                            sh "nohup java -jar target/${service}.jar &"
                        }
                    }
                }
            }
        }
    }
}
