var express = require('express')
var _ = require('lodash')
var request = require('request')
var GithubWebHook = require('express-github-webhook')
var bodyParser = require('body-parser')
var chalk = require('chalk')
var debug = require('debug-log')('github-auto-label')

var repos = process.env.GITHUB_REPOS || 'github-auto-label'
if (repos.indexOf(',') > -1) {
  repos = repos.split(',')
} else {
  repos = [repos]
}

var label = {
  pr: process.env.GITHUB_PR_LABEL || 'needs-review',
  issue: process.env.GITHUB_ISSUE_LABEL || 'needs-triage'
}

var webhookSettings = {
  path: process.env.WEBHOOK_PATH || '/',
  secret: process.env.GITHUB_SECRET || 'thisIsASuperSecretSecret'
// Personal Access Token: https://github.com/settings/tokens/new
}

var webhookHandler = GithubWebHook(webhookSettings)

var app = express()
app.set('port', process.env.PORT || 5555)
app.use(bodyParser.json()) // must use bodyParser in express
app.use(webhookHandler) // use our middleware

webhookHandler.on('pull_request', function (repo, data) {
  // Event name https://developer.github.com/webhooks/#events
  console.log(repo, data)
  if (repos.indexOf(repo) < 0 || data.action !== 'opened') return
  console.log('[%s] Incoming webhook. adding label [%s] to %s#%s', chalk.yellow('github-auto-label'), label.pr, repo, data.pull_request.number)
})
webhookHandler.on('issues', function (repo, data) {
  // Event name https://developer.github.com/webhooks/#events
  console.log(repo, data)
  if (repos.indexOf(repo) < 0 || data.action !== 'opened') return
  console.log('[%s] Incoming webhook. adding label [%s] to %s#%s', chalk.yellow('github-auto-label'), label.issue, repo, data.issue.number)
})

webhookHandler.on('error', function (err, req, res) {
  // something went wrong
  console.error('an error occurred', err)
})

app.listen(app.get('port'), function () {
  console.log('Auto Labeler listening on port ' + app.get('port'))
})
