node {
    try {
        notifyBuild('STARTED')

        def project = 'atlasmoneyhub'
        def appName = 'atlas-pay-frontend'
        def tagNumber = 1000 + (env.BUILD_NUMBER as int)
        def imageTag = "${project}/${appName}:${env.BRANCH_NAME}.${tagNumber}"

        checkout scm

        stage('Check tools') {
            sh("docker --version")
        }

        stage('Build image') {
            sh("docker build -t ${imageTag} .")
        }

        stage('Run tests') {
            // sh("npm install")
            // sh("gulp test")
        }

        stage('Push image to registry') {
            sh("docker push ${imageTag}")
        }

        stage("Deploy Application") {
            switch (env.BRANCH_NAME) {
                // Roll out to staging
                case "staging":
                    sh("sed -i.bak 's#atlasmoneyhub/atlas-pay-frontend#${imageTag}#' ./kubernetes/staging/*.yaml")
                    sh("kubectl --context aws_atlasmoney-k8s --namespace=staging apply -f kubernetes/services/")
                    sh("kubectl --context aws_atlasmoney-k8s --namespace=staging apply -f kubernetes/staging/")
                    break

                // Roll out to production
                case "master":
                    sh("sed -i.bak 's#atlasmoneyhub/atlas-pay-frontend#${imageTag}#' ./kubernetes/production/*.yaml")
                    sh("kubectl --context aws_atlasmoney-k8s --namespace=production apply -f kubernetes/services/")
                    sh("kubectl --context aws_atlasmoney-k8s --namespace=production apply -f kubernetes/production/")
                    break

                // Roll out to development
                case "Develop":
                    sh("sed -i.bak 's#atlasmoneyhub/atlas-pay-frontend#${imageTag}#' ./kubernetes/development/*.yaml")
                    sh("kubectl --namespace=default apply -f kubernetes/services/ --validate=false")
                    sh("kubectl --namespace=default apply -f kubernetes/development/ --validate=false")
                    break

                // Roll out a feature environment
                default:
                    echo "This is a feature branch!. We currently do not support deployment for feature branch"
            }
        }
    } catch (e) {
        // If there was an exception thrown, the build failed
        currentBuild.result = "FAILED"
        throw e
    } finally {
        // Success or failure, always send notifications
        notifyBuild(currentBuild.result)
    }
}


def notifyBuild(String buildStatus = 'STARTED') {
    // build status of null means successful
    buildStatus = buildStatus ?: 'SUCCESS'

    // Default values
    def colorCode = '#FF0000'
    def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} (${env.BUILD_URL})"
    def details = """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
    <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>"""

    // Override default values based on build status
    if (buildStatus == 'STARTED') {
        colorCode = '#FFFF00'
    } else if (buildStatus == 'SUCCESS') {
        colorCode = '#00FF00'
    } else {
        colorCode = '#FF0000'
    }

    // Send notifications
    slackSend (color: colorCode, message: summary)

    //send email in the future
    //emailext (
      //subject: subject,
      //body: details,
      //recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    //)
}
