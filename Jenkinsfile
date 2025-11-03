pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose2.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                
                git branch: 'main', 
                url: 'git@github.com:arslan-112/DevOps-WebApp.git'
            }
        }

        stage('Build & Run Containers') {
            steps {
                sh 'docker-compose -f ${COMPOSE_FILE} down'
                sh 'docker-compose -f ${COMPOSE_FILE} up -d --build'
            }
        }

        stage('Verify Services') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete.'
        }
    }
}
