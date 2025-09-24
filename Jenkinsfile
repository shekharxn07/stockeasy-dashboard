pipeline {
    agent any

    environment {
        // Tomcat ke webapps path
        TOMCAT_PATH = "C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps"
        APP_NAME = "stockeasy-frontend"   // Tomcat me app ka naam
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

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to Tomcat') {
            steps {
                bat """
                    rmdir /S /Q "%TOMCAT_PATH%\\%APP_NAME%"
                    mkdir "%TOMCAT_PATH%\\%APP_NAME%"
                    xcopy build "%TOMCAT_PATH%\\%APP_NAME%" /E /I /Y
                """
            }
        }
    }

    post {
        success {
            echo "✅ StockEasy frontend deployed successfully! Visit http://localhost:8080/${APP_NAME}"
        }
        failure {
            echo "❌ Deployment failed. Check console logs."
        }
    }
}
