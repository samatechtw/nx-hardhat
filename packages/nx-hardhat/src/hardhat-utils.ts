import { GeneratorCallback, joinPathFragments } from '@nrwl/devkit';
import * as shell from 'shelljs';

function commandSetup(
  workspaceRoot: string,
  projectRoot: string,
  args: string[]
): string {
  const cmdPath = joinPathFragments(
    workspaceRoot,
    './node_modules/.bin/hardhat'
  );
  const cmd = `${cmdPath} ${args.join(' ')}`;
  console.info(`Running: ${cmd}`);

  if (!shell.test('-e', cmdPath)) {
    throw new Error(`Hardhat must be installed via NPM to run:\n> ${cmd}`);
  }
  if (!shell.pwd().endsWith(projectRoot)) {
    const paths = shell.pushd('-q', projectRoot);
    if (!paths || !paths.length) {
      throw new Error(`Project path not found: ${projectRoot}`);
    }
  }
  return cmd;
}

export function runHardhatCommand(
  workspaceRoot: string,
  projectRoot: string,
  ...args: string[]
): shell.ShellString {
  const cmd = commandSetup(workspaceRoot, projectRoot, args);

  const cmdResult = shell.exec(cmd);
  if (cmdResult.code !== 0) {
    shell.popd();
    console.error(`Hardhat command failed:\n> ${cmd}`);
    throw new Error();
  }
  shell.popd();
  return cmdResult;
}
