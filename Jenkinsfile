pipeline {
    agent any

    environment {
        NODE_ENV = "development"
    }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm install'
            }
        }

        stage('Start React App') {
            steps {
                echo 'Starting React app using npm start...'
                bat 'start /B npm start'
                sleep 10
            }
        }

        stage('Verify Home Page') {
            steps {
                echo 'Verifying that the home page is running...'
                bat 'curl -I http://localhost:3000'
            }
        }

    post {
        success {
            echo '✅ React app started successfully with npm start!'
        }
        failure {
            echo '❌ Build failed. Check console logs for details.'
        }
    }
}
