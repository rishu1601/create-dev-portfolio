import { execFileSync } from 'node:child_process'

const isWindows = process.platform === 'win32'

// npm/vercel resolve to .cmd shims on Windows, which execFileSync can only
// launch via a shell. git/gh are real .exe there, and routing them through
// cmd.exe would re-split quoted multi-word args (e.g. a commit message) on
// spaces — so only shim-based commands get shell:true.
const SHIM_COMMANDS = new Set(['npm', 'npx', 'vercel'])

function useShell(command: string): boolean {
  return isWindows && SHIM_COMMANDS.has(command)
}

export function run(command: string, args: string[], cwd: string): void {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: useShell(command),
  })
}

// Silent probe for "is this installed / am I signed in" checks — no output,
// returns false instead of throwing.
export function tryRun(command: string, args: string[], cwd: string): boolean {
  try {
    execFileSync(command, args, {
      cwd,
      stdio: 'ignore',
      shell: useShell(command),
    })
    return true
  } catch {
    return false
  }
}
