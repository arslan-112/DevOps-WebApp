pipeline {
    agent any

    environment {
        EC2_PUBLIC_IP = '3.111.81.89'
        DOCKER_NETWORK = 'second_ci-network'
        ADMIN_EMAIL = "ijazarslan372@gmail.com"   // fallback email
    }

    stages {

        stage('Get Committer Email') {
            steps {
                script {
                    env.GIT_COMMITTER_EMAIL = sh(
                        script: 'git log -1 --pretty=format:"%ae"',
                        returnStdout: true
                    ).trim()
                    env.GIT_COMMITTER_NAME = sh(
                        script: 'git log -1 --pretty=format:"%an"',
                        returnStdout: true
                    ).trim()

                    echo "Commit by: ${env.GIT_COMMITTER_NAME} (${env.GIT_COMMITTER_EMAIL})"
                }
            }
        }

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
            environment {
                MONGO_URI = credentials('MONGO_ATLAS_URI')
                JWT_KEY   = credentials('JWT_SECRET')
            }
            steps {
                sh '''
                sudo chown -R jenkins:jenkins .
                sudo chmod -R 777 .
                mkdir -p Backend
                cat > Backend/.env <<EOF
MONGO_URI=$MONGO_URI
JWT_SECRET=$JWT_KEY
EOF

                docker compose -f docker-compose2.yml down || true
                docker compose -f docker-compose2.yml up -d --build 
                sleep 25
                '''
            }
        }

        stage('Build Test Image') {
            steps {
                sh '''
                docker build -f tests/Dockerfile -t elite-toys-tests tests/
                '''
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh '''
                NETWORK=$(docker network ls --filter name=ci-network --format "{{.Name}}" | head -n1)

                docker run --rm \
                --network="$NETWORK" \
                -v "$PWD/tests:/app" \
                -e BASE_URL="http://frontend2:5173" \
                --shm-size="2gb" \
                elite-toys-tests \
                pytest selenium_tests.py -v
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
                '''
            }
        }
    }

    post {
        success {
            script {
                def recipient = env.GIT_COMMITTER_EMAIL ?: env.ADMIN_EMAIL

                mail to: recipient,
                    subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """Build Successful!

Triggered by: ${env.GIT_COMMITTER_NAME} (${env.GIT_COMMITTER_EMAIL})
Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}

All tests PASSED.
View Build: ${env.BUILD_URL}
"""
            }
        }

        failure {
            script {
                def recipient = env.GIT_COMMITTER_EMAIL ?: env.ADMIN_EMAIL

                mail to: recipient,
                    subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """Build Failed!

Triggered by: ${env.GIT_COMMITTER_NAME} (${env.GIT_COMMITTER_EMAIL})
Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}

One or more tests FAILED.
View Build: ${env.BUILD_URL}
"""
            }
        }
    }
}
