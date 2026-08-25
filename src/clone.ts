import { existsSync, rmSync } from 'node:fs'
import { run } from './exec.js'

export function cloneTemplate(templateUrl: string, targetDir: string): void {
  if (existsSync(targetDir)) {
    throw new Error(`Target directory already exists: ${targetDir}`)
  }

  console.log(`\nCloning ${templateUrl} into ${targetDir} ...`)
  run('git', ['clone', '--depth', '1', templateUrl, targetDir], process.cwd())

  // Strip the template's own git history and start a fresh repo — this is
  // the user's portfolio now, not a fork of the template.
  rmSync(`${targetDir}/.git`, { recursive: true, force: true })
  run('git', ['init'], targetDir)
}
