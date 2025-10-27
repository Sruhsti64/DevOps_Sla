pipeline {
    agent any

    environment {
        NODE_ENV = "development"
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo 'Fetching source code from GitHub...'
                git branch: 'main', url: 'https://github.com/Sruhsti64/DevOps_Sla.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm install'
            }
        }

        stage('Start React App') {
            steps {
                echo 'Starting React app using npm start...'
                sh 'nohup npm start > server.log 2>&1 &'
                sleep 10
            }
        }

        stage('Verify Home Page') {
            steps {
                echo 'Verifying that the home page is running...'
                sh 'curl -I http://localhost:3000'
            }
        }
    }

    post {
        success {
            echo 'React app started successfully with npm start!'
        }
        failure {
            echo 'Build failed. Check console logs for details.'
        }
    }
}
