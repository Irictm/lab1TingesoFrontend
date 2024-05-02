pipeline{
    agent any
    stages{
        stage("Build Frontend"){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Irictm/lab1TingesoFrontend.git']])
                bat "npm install"
                bat "npm run build"
            }
        }
        stage("Build and Push Docker Image"){
            steps{
                script{
                     withDockerRegistry(credentialsId: 'docker-credentials-iri'){
                        bat "docker build -t irictm/lab1-tingeso-frontend:latest ."
                        bat "docker push irictm/lab1-tingeso-frontend:latest"
                    }
                }
            }
        }
    }
}