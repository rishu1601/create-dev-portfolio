import { readFileSync, writeFileSync } from 'node:fs'
import type { InterviewAnswers } from './types.js'

// Merges interview answers into the template's existing config/profile.json
// rather than reconstructing the whole file, so skills/education/about/
// navigationConfig placeholders pass through untouched for the user (or a
// future portfolio-agent pass) to fill in later.
//
// experiences/projects are cleared to [] rather than left as template
// examples: app/page.tsx already hides those sections entirely when empty
// (Projects.tsx even returns null), so an empty default means nobody ships
// someone else's fake work history by forgetting to edit it. skills/about
// can't get the same treatment — the template always renders those
// sections regardless of content, so emptying them would leave visibly
// blank grids instead of gracefully hiding.
export function writeProfile(targetDir: string, answers: InterviewAnswers): void {
  const profilePath = `${targetDir}/config/profile.json`
  const raw = readFileSync(profilePath, 'utf-8')
  const profile = JSON.parse(raw) as Record<string, unknown>

  profile.personalInfo = answers.personalInfo
  profile.githubUsername = answers.githubUsername
  profile.experiences = []
  profile.projects = []

  writeFileSync(profilePath, JSON.stringify(profile, null, 2) + '\n', 'utf-8')
  console.log(`\nWrote ${profilePath}`)
}
