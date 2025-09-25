pipeline {
    agent any
    
    environment {
        TOMCAT_HOME = 'C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/shekharxn07/stockeasy-dashboard.git'
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
                dir('stockeasy-backend') {
                    // Add error handling and verbose output
                    bat '''
                        echo "Installing backend dependencies..."
                        if exist "package.json" (
                            call npm install
                        ) else (
                            echo "Error: package.json not found in stockeasy-backend directory"
                            exit 1
                        )
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('stockeasy-frontend') {
                    // Add error handling and verbose output
                    bat '''
                        echo "Installing frontend dependencies..."
                        if exist "package.json" (
                            call npm install
                            call npm run build
                        ) else (
                            echo "Error: package.json not found in stockeasy-frontend directory"
                            exit 1
                        )
                    '''
                }
            }
        }

        stage('Deploy Frontend to Tomcat') {
            steps {
                script {
                    def tomcatWebApps = "${env.TOMCAT_HOME}\\webapps"
                    
                    // Create deployment directory if it doesn't exist
                    bat "if not exist \"${tomcatWebApps}\\stockeasy\" mkdir \"${tomcatWebApps}\\stockeasy\""
                    
                    // Copy build files to Tomcat
                    bat "xcopy /s /y \"${WORKSPACE}\\stockeasy-frontend\\build\\*\" \"${tomcatWebApps}\\stockeasy\\\""
                }
            }
        }

        stage('Deploy Backend with PM2') {
            steps {
                dir('stockeasy-backend') {
                    // Install PM2 globally if not already installed
                    bat 'npm install -g pm2'
                    
                    // Stop existing instance if running
                    bat 'pm2 delete stockeasy-backend || exit 0'
                    
                    // Start new instance
                    bat 'pm2 start server.js --name stockeasy-backend'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully!'
        }
        failure {
            echo '❌ Deployment failed. Check console logs.'
        }
    }
}
