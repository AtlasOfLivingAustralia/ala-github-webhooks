###github-webhooks
At the moment this project is used to rebuild/refresh/update the [ALA build status summary table](https://gist.github.com/mbohun/ee2345d4c8a80ede2628#file-ala_build_summary_with_emoji-md) included from https://atlasoflivingaustralia.github.io when a travis-ci "build finished" event is received.

###requirements
- some HTTP/REST "listener" capable of receiving/handling [github events](https://developer.github.com/webhooks/#events), for example nodejs, sinatra, etc., this impl uses nodejs + githubhook for nodejs:
  - [nodejs](https://nodejs.org)
  - [githubhook](https://github.com/nlf/node-github-hook)
- wget, curl, sed, grep, git (most of the time already installed)
- env variables
  - `GIST_TOKEN` (used by the BASH scripts for authentication/REST comm, and to clone/commit/push the build status summary table gist) *NOTE: These scripts used to run from travis-ci.org and a gist token (although encrypted) is considered less dangerous (as in more restricted) than a github token* if stolen/compromised
  - `GITHUB_WEBHOOKS_SECRET` (used by the node listener, this has to be set to the value you configured in github webhooks configuration)
- nginx, apache2, etc. - some webserver capable of proxying to your event listener/handler (or you need to open a dedicated TCP port for receiving the event messages from github)

###github configuration
Through the github web ui or via github REST API you need to setup/configure on what host:port is your webhook listener listening, and which github events you want to be receiving

###TODO: finish this; fill it with the exciting details about github webhooks/event configuration

###listener installation

###TODO:
