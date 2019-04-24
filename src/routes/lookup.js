import qs from 'qs'

import { constructGhIssueSlackMessage, fetchGithubIssue, parseGhIssueString } from '../utils'

const lookup = async request => {
  const body = await request.text()
  const params = qs.parse(body)
  const text = params["text"].trim()
  try {
    const { owner, repo, issue_number } = parseGhIssueString(text)
    const response = await fetchGithubIssue(owner, repo, issue_number)
    const issue = await response.json()
    return new Response(
      JSON.stringify({
        blocks: constructGhIssueSlackMessage(issue, owner, repo, issue_number),
        response_type: 'in_channel'
      }),
      { headers: { 'Content-type': 'application/json' } }
    )
  } catch (err) {
    console.log(err)
    const errorText = "Uh-oh! We couldn't find the issue you provided. We can only find public issues in the following format: `owner/repo#issue_number`."
    return new Response(errorText)
  }
}

export default lookup
