import { run } from './exec.js'

export function verifyBuild(targetDir: string): void {
  console.log('\nInstalling dependencies (npm install) ...')
  run('npm', ['install'], targetDir)

  console.log('\nVerifying the site builds (npm run build) ...')
  run('npm', ['run', 'build'], targetDir)
}
