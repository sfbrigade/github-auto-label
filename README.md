# github-auto-label
A small Node.js webhook service to auto-label new issues or PRs on submission

This micro-service depends on enviroment variables being set. Listed below are the required values.

Environment Variable | Description | Default
-------------------- | ----------- | -------
`GITHUB_REPOS` | A comma-delimited list of repos to watch for (e.g. `github-auto-label` or `github-auto-label,github-add`) | undefined
`GITHUB_PR_LABELS` | A comma-delimited list of labels to attach to new pull requests (leave empty to disable PR labeling) | undefined
`GITHUB_ISSUE_LABELS` | A comma-delimited list of labels to attach to new issues (leave empty to disable issue labeling) | undefined
`GITHUB_TOKEN` | A valid Github Access Token (Create a personal one here: https://github.com/settings/tokens/new) | undefined
`WEBHOOK_PATH` | Server path for the webhook | `/`
`GITHUB_SECRET` | Passphrase set up during Webhook addition | `thisIsASuperSecretSecret`
`PORT` | Server port | `80`
