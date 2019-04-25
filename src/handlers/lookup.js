import qs from "qs"

import {fetchGithubIssue, parseGhIssueString} from "../utils/github"
import {constructGhIssueSlackMessage} from "../utils/slack"

export default async request => {
  try {
    const body = await request.text()
    const params = qs.parse(body)
    const text = params["text"].trim()
    const {owner, repo, issue_number} = parseGhIssueString(text)

    const response = await fetchGithubIssue(owner, repo, issue_number)
    const issue = await response.json()

    const blocks = constructGhIssueSlackMessage(issue, text)

    return new Response(
      JSON.stringify({
        blocks,
        response_type: "in_channel"
      }),
      {headers: {"Content-type": "application/json"}}
    )
  } catch (err) {
    const errorText =
      "Uh-oh! We couldn't find the issue you provided. We can only find public issues in the following format: `owner/repo#issue_number`."
    return new Response(errorText)
  }
}
