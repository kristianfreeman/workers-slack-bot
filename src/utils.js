const parseUrl = request => new URL(request.url)

export const isPost = request =>
  request.method === "POST"

export const routeMatches = (request, path) => {
  const url = parseUrl(request)
  return url.pathname.includes(path)
}

export const constructGhIssueSlackMessage = (issue, owner, repo, issue_number, prefix_text) => {
  const issue_string = `${owner}/${repo}#${issue_number}`

  const textChunks = [
    prefix_text,
    `*${issue.title} - <${issue.html_url}|${issue_string}>*`,
    issue.body,
    `*${issue.state}* - Created by <${issue.user.html_url}|${issue.user.login}> on ${issue.created_at}`
  ]

  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: textChunks.filter(el => el).join('\n')
      },
      accessory: {
        type: "image",
        image_url: issue.user.avatar_url,
        alt_text: issue.user.login
      }
    }
  ]
}

export const fetchGithubIssue = (owner, repo, issue_number) => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`, {
    headers: { 'User-Agent': 'simple-worker-slack-bot' }
  })
}

const ghIssueRegex = /(?<owner>.*)\/(?<repo>.*)\#(?<issue_number>.*)/;
export const parseGhIssueString = text => {
  const match = text.match(ghIssueRegex)
  return match ? match.groups : null
}
