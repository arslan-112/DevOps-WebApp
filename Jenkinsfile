pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build & Run Containers') {
            steps {
                sh '''
                sudo chown -R jenkins:jenkins .
                sudo chmod -R 777 .

                docker compose -f docker-compose2.yml down || true

                docker compose -f docker-compose2.yml up -d --build
                '''
            }
        }

        stage('Verify Services') {
            steps {
                sh '''
                docker ps
                echo "Backend logs:"
                docker logs mern-backend2 || true
                '''
            }
        }
    }

    post {
        always {
            echo 'Build complete.'
        }
    }
}
