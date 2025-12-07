pipeline {
    agent any

    environment {
        EC2_PUBLIC_IP = '3.111.81.89'  
    }

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

        stage('Prepare Environment Files') {
            steps {
                sh '''
                mkdir -p frontend
                cat > frontend/.env <<EOF
VITE_API_BASE_URL=http://${EC2_PUBLIC_IP}:5001/api
VITE_API_BASE_URL2=http://${EC2_PUBLIC_IP}:5001
EOF

                
                '''
            }
        }

        stage('Build & Run Containers') {
            steps {
                sh '''
                sudo chown -R jenkins:jenkins .
                sudo chmod -R 777 .

                docker compose -f docker-compose2.yml down || true
                docker compose -f docker-compose2.yml up -d --build mongo2 backend2 frontend2
                sleep 25
                '''
            }
        }
        stage('Run Selenium Tests') {
            steps {
                sh '''
                # Run test container 
                docker compose -f docker-compose2.yml run --rm test-runner
                '''
            }
        }

        stage('Verify Services') {
            steps {
                sh '''
                docker ps
                echo "Frontend .env:"
                cat frontend/.env
                echo "Backend logs:"
                docker logs mern-backend2 || true
                '''
            }
        }
    }

    post {
        always {
            script {
                
                echo 'Pipeline completed.'
            }
        }
        success {
            script {
                emailext (
                    subject: "Assignment-3 Tests PASSED: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                    body: "All 10 Selenium tests passed.\nBuild URL: ${env.BUILD_URL}",
                    recipientProviders: [[$class: 'CulpritsRecipientProvider']]
                )
            }
        }
        failure {
            script {
                emailext (
                    subject: "Assignment-3 Tests FAILED: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                    body: "One or more tests failed.\nBuild URL: ${env.BUILD_URL}",
                    recipientProviders: [[$class: 'CulpritsRecipientProvider']]
                )
            }
        }
    }
}