// Minimal shape this CLI needs to know about. The full ProfileData schema
// (experiences, skills, education, projects, about, navigationConfig) lives
// in dev-portfolio-template's lib/profile.ts — this CLI only ever fills in
// personalInfo + githubUsername and leaves everything else in the cloned
// template's config/profile.json untouched.

export interface SocialLinks {
  github: string
  linkedin: string
  email: string
  blog: string
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  socialLinks: SocialLinks
  location: string
  resume: {
    filename: string
    displayName: string
  }
}

export interface InterviewAnswers {
  personalInfo: PersonalInfo
  githubUsername: string
}
