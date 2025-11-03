pipeline {
    agent any

    environment {
        PROJECT_DIR = "DevOps-WebApp-Part2"
        REPO_URL = "https://github.com/arslan-112/DevOps-WebApp.git"
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "Cloning public repository for Part 2..."
                sh "rm -rf ${PROJECT_DIR}"
                sh "git clone ${REPO_URL} ${PROJECT_DIR}"
            }
        }

        stage('Build Docker Images') {
            steps {
                dir("${PROJECT_DIR}") {
                    echo "Building Docker images for Part 2..."
                    sh "docker-compose -f docker-compose2.yml build"
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                dir("${PROJECT_DIR}") {
                    echo "Deploying Part 2 containers..."
                    sh "docker-compose -f docker-compose2.yml down"
                    sh "docker-compose -f docker-compose2.yml up -d"
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo "Cleaning up unused Docker resources..."
                sh "docker system prune -f"
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Build or deployment failed. Check logs above."
        }
    }
}
