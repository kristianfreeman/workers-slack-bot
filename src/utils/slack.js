const compact = array => array.filter(el => el);

export const constructGhIssueSlackMessage = (
  issue,
  owner,
  repo,
  issue_number,
  prefix_text,
) => {
  const issue_string = `${owner}/${repo}#${issue_number}`;
  const issue_link = `<${issue.html_url}|${issue_string}>`;
  const user_link = `<${issue.user.html_url}|${issue.user.login}>`;
  const date = new Date(Date.parse(issue.created_at)).toLocaleDateString();

  const textChunks = [
    prefix_text,
    `*${issue.title} - ${issue_link}*`,
    issue.body,
    `*${issue.state}* - Created by ${user_link} on ${date}`,
  ];

  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: compact(textChunks).join('\n'),
      },
      accessory: {
        type: 'image',
        image_url: issue.user.avatar_url,
        alt_text: issue.user.login,
      },
    },
  ];
};
