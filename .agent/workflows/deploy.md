---
description: Deploy changes to Netlify via git push
---

# Deploy Workflow

This workflow commits and pushes all changes to deploy to Netlify.

## Steps

// turbo-all

1. Stage all changes:

```
git add -A
```

2. Commit with provided message:

```
git commit -m "[COMMIT_MESSAGE]"
```

3. Push to remote:

```
git push origin master:main
```

4. Confirm deployment initiated and remind user to check https://brkthrucoaching.com after 1-2 minutes.
