pipeline {
    agent any

    environment {
        NODE_VERSION = "18"               // Node.js version
        BACKEND_DIR = "backend"           // Backend folder name
        FRONTEND_DIR = "frontend"         // Frontend folder name
        PM2_APP_NAME = "stockeasy-backend"
    }

    tools {
        nodejs "NodeJS18"                 // Jenkins NodeJS tool name
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/shekharxn07/stockeasy-dashboard.git', branch: 'main'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm install --production'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Backend with PM2') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh "pm2 stop ${PM2_APP_NAME} || true"
                    sh "pm2 start server.js --name ${PM2_APP_NAME}"
                    sh "pm2 save"
                }
            }
        }

        stage('Frontend Serve via Backend') {
            steps {
                echo "Frontend will be served by Express backend (no extra step needed)."
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
