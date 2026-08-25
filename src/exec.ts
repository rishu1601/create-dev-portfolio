import { execFileSync } from 'node:child_process'

const isWindows = process.platform === 'win32'

// npm resolves to a .cmd shim on Windows, which execFileSync can only launch
// via a shell. git is a real .exe there, and routing it through cmd.exe would
// re-split quoted multi-word args (e.g. a commit message) on spaces — so only
// shim-based commands get shell:true.
const SHIM_COMMANDS = new Set(['npm', 'npx'])

export function run(command: string, args: string[], cwd: string): void {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: isWindows && SHIM_COMMANDS.has(command),
  })
}
