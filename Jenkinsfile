pipeline {
    agent any

    environment {
        // Tomcat ke webapps path
        TOMCAT_PATH = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps"
        FRONTEND_APP = "stockeasy-frontend"     // Tomcat me frontend ka naam
        FRONTEND_DIR = "frontend"               // Frontend folder repo me
        BACKEND_DIR = "backend"                 // Backend folder repo me
        PM2_APP_NAME = "stockeasy-backend"      // PM2 backend app name
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/shekharxn07/stockeasy-dashboard.git'
            }
        }

        stage('Check Node & NPM') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'npm install --production'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                bat """
                    rmdir /S /Q "%TOMCAT_PATH%\\%FRONTEND_APP%"
                    mkdir "%TOMCAT_PATH%\\%FRONTEND_APP%"
                    xcopy ${FRONTEND_DIR}\\build "%TOMCAT_PATH%\\%FRONTEND_APP%" /E /I /Y
                """
            }
        }

        stage('Deploy Backend with PM2') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat "pm2 stop ${PM2_APP_NAME} || exit 0"
                    bat "pm2 start server.js --name ${PM2_APP_NAME}"
                    bat "pm2 save"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend + Backend deployed successfully!"
            echo "Frontend: http://localhost:8080/${FRONTEND_APP}"
            echo "Backend running via PM2 as ${PM2_APP_NAME}"
        }
        failure {
            echo "❌ Deployment failed. Check console logs."
        }
    }
}
