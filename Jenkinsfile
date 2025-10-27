pipeline {
    agent any

    environment {
        NODE_ENV = "development"
        PORT = "3000"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm install'
            }
        }

        stage('Start React App') {
            steps {
                echo 'Starting React app using npm start...'
                bat 'npm start'
                echo 'Waiting for app to start...'
                sleep 15
            }
        }

        stage('Verify Home Page') {
            steps {
                echo 'Verifying that the home page is running...'
                bat 'curl -I http://localhost:%PORT%'
            }
        }
    }

    post {
        success {
            echo '✅ React app started successfully!'
            echo '🌐 Open http://localhost:3000 in your browser to view it.'
        }
        failure {
            echo '❌ Build failed. Check console logs for details.'
        }
    }
}
