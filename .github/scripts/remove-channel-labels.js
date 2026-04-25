module.exports = async ({ github, context }) => {
  const { data: labels } = await github.rest.issues.listLabelsOnIssue({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.payload.pull_request.number,
  });

  const channelLabels = labels
    .map(l => l.name)
    .filter(n => n.startsWith("channel: ") && n !== "channel: ALL");

  for (const label of channelLabels) {
    await github.rest.issues.removeLabel({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.payload.pull_request.number,
      name: label,
    });
  }
};
