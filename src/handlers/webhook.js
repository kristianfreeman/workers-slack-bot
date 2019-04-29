import { slackWebhookUrl } from '../config'
import { constructGhIssueSlackMessage } from '../utils/slack'

export default async request => {
  try {
    const body = await request.text()
    const { action, issue, repository } = JSON.parse(body)
    const prefix_text = `An issue was ${action}:`
    const issue_string = `${repository.owner.login}/${repository.name}#${issue.number}`
    const blocks = constructGhIssueSlackMessage(issue, issue_string, prefix_text)

    const postToSlack = await fetch(slackWebhookUrl, {
      body: JSON.stringify({ blocks }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    return new Response('OK')
  } catch (err) {
    const errorText = 'Unable to handle webhook'
    return new Response(errorText, { status: 500 })
  }
}
