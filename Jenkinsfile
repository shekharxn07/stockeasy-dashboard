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
                    script {
                        // Install PM2 globally and capture npm prefix
                        def npmPrefix = bat(script: 'npm config get prefix', returnStdout: true).trim()
                        bat 'npm install -g pm2'
                        
                        // Use full path to PM2 executable
                        def pm2Path = "${npmPrefix}\\pm2.cmd"
                        
                        // Stop existing instance if running
                        bat "\"${pm2Path}\" delete stockeasy-backend || exit 0"
                        
                        // Start new instance with full path to Node
                        bat "\"${pm2Path}\" start server.js --name stockeasy-backend"
                        
                        // Save PM2 process list
                        bat "\"${pm2Path}\" save"
                    }
                }
            }
        }
    }

    post {
        success {
            echo '''✅ Deployment completed successfully!
            
Frontend: http://localhost:8080/stockeasy
Backend: Running on PM2 (use pm2 status to check)
'''
        }
        failure {
            script {
                def currentStage = currentBuild.result == "FAILURE" ? env.STAGE_NAME : "Unknown"
                echo """❌ Deployment failed at stage: ${currentStage}
                
Troubleshooting steps:
1. Check if Tomcat is running
2. Verify PM2 installation
3. Check file permissions
4. Review console logs above for specific error messages
"""
            }
        }
        always {
            // Clean workspace after build
            cleanWs()
        }
    }
}
