import { input } from '@inquirer/prompts'
import type { InterviewAnswers } from './types.js'

const notBlank = (label: string) => (value: string) =>
  value.trim().length > 0 || `${label} can't be empty`

const looksLikeEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Enter a valid email address'

export async function runInterview(): Promise<InterviewAnswers> {
  console.log("\nLet's set up your portfolio. Answer a few questions — anything else\ncan be edited later directly in config/profile.json.\n")

  const name = await input({ message: 'Your full name:', validate: notBlank('Name') })

  const title = await input({
    message: 'Your professional title (e.g. "Full Stack Engineer | Systems Architect"):',
    validate: notBlank('Title'),
  })

  const bio = await input({
    message: 'A short bio (1-2 sentences):',
    validate: notBlank('Bio'),
  })

  const githubUsername = await input({
    message: 'GitHub username:',
    validate: notBlank('GitHub username'),
  })

  const linkedin = await input({
    message: 'LinkedIn URL (leave blank to skip):',
    default: '',
  })

  const email = await input({
    message: 'Contact email:',
    validate: looksLikeEmail,
  })

  const blog = await input({
    message: 'Personal website/blog URL (leave blank to skip):',
    default: '',
  })

  const location = await input({
    message: 'Location (City, Country):',
    validate: notBlank('Location'),
  })

  return {
    personalInfo: {
      name: name.trim(),
      title: title.trim(),
      bio: bio.trim(),
      socialLinks: {
        github: `https://github.com/${githubUsername.trim()}`,
        linkedin: linkedin.trim(),
        email: email.trim(),
        blog: blog.trim(),
      },
      location: location.trim(),
      resume: {
        filename: 'Resume.pdf',
        displayName: 'Resume.pdf',
      },
    },
    githubUsername: githubUsername.trim(),
  }
}
