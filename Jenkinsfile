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
            }
        }
    }

    post {
        success {
            echo 'React app started successfully!'
            echo 'Open http://localhost:3000 in your browser to view it.'
        }
        failure {
            echo 'Build failed. Check console logs for details.'
        }
    }
}
