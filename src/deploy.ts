import { confirm } from '@inquirer/prompts'
import { run, tryRun } from './exec.js'

// Creates a GitHub repo + pushes, then deploys to Vercel — both opt-in and
// both degrade gracefully: a missing/unauthenticated CLI just prints the
// manual command and moves on, since the user's local portfolio (already
// built and committed) is the actual deliverable either way.
export async function maybeDeploy(targetDir: string, repoName: string): Promise<void> {
  const wantsDeploy = await confirm({
    message: 'Push to GitHub and deploy to Vercel now?',
    default: false,
  })
  if (!wantsDeploy) return

  if (!tryRun('gh', ['auth', 'status'], targetDir)) {
    console.log('\nSkipping GitHub push — gh CLI is not installed or not signed in.')
    console.log('Run `gh auth login`, then from the project directory:')
    console.log('  gh repo create --public --source=. --remote=origin --push\n')
    return
  }

  console.log(`\nCreating GitHub repo "${repoName}" and pushing...`)
  try {
    run('gh', ['repo', 'create', repoName, '--public', '--source=.', '--remote=origin', '--push'], targetDir)
  } catch {
    console.log(`\nCould not create/push GitHub repo "${repoName}" (name may already be taken).`)
    console.log('Create it manually, then from the project directory: git push -u origin master\n')
    return
  }

  if (!tryRun('vercel', ['--version'], targetDir)) {
    console.log('\nSkipping Vercel deploy — vercel CLI is not installed.')
    console.log('Install it with `npm i -g vercel`, then from the project directory: vercel --prod\n')
    return
  }

  if (!tryRun('vercel', ['whoami'], targetDir)) {
    console.log('\nSkipping Vercel deploy — not signed in.')
    console.log('Run `vercel login`, then from the project directory: vercel --prod\n')
    return
  }

  console.log('\nDeploying to Vercel...')
  try {
    run('vercel', ['--prod', '--yes'], targetDir)
  } catch {
    console.log('\nVercel deploy failed. Run `vercel --prod` manually from the project directory.\n')
  }
}
