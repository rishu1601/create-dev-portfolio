import { readFileSync, writeFileSync } from 'node:fs'
import type { InterviewAnswers } from './types.js'

// Merges interview answers into the template's existing config/profile.json
// rather than reconstructing the whole file, so experiences/skills/education/
// projects/about/navigationConfig placeholders pass through untouched for
// the user (or a future portfolio-agent pass) to fill in later.
export function writeProfile(targetDir: string, answers: InterviewAnswers): void {
  const profilePath = `${targetDir}/config/profile.json`
  const raw = readFileSync(profilePath, 'utf-8')
  const profile = JSON.parse(raw) as Record<string, unknown>

  profile.personalInfo = answers.personalInfo
  profile.githubUsername = answers.githubUsername

  writeFileSync(profilePath, JSON.stringify(profile, null, 2) + '\n', 'utf-8')
  console.log(`\nWrote ${profilePath}`)
}
