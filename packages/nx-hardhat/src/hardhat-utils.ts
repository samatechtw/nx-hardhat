import { GeneratorCallback, joinPathFragments } from '@nrwl/devkit';
import * as shell from 'shelljs';

function commandSetup(
  workspaceRoot: string,
  projectRoot: string,
  args: string[]
): string | null {
  const cmdPath = joinPathFragments(
    workspaceRoot,
    './node_modules/.bin/hardhat'
  );
  const cmd = `${cmdPath} ${args.join(' ')}`;
  console.info(`Running: ${cmd}`);

  if (!shell.test('-e', cmdPath)) {
    console.error(`Hardhat must be installed via NPM to run:\n> ${cmd}`);
    throw new Error();
  }
  if (!shell.pwd().endsWith(projectRoot)) {
    const paths = shell.pushd('-q', projectRoot);
    if (!paths || !paths.length) {
      return null;
    }
  }
  return cmd;
}

export function runHardhatCommand(
  workspaceRoot: string,
  projectRoot: string,
  ...args: string[]
): GeneratorCallback {
  return (): void => {
    const cmd = commandSetup(workspaceRoot, projectRoot, args);

    if (!cmd || shell.exec(cmd).code !== 0) {
      shell.popd();
      console.error(`Hardhat command failed:\n> ${cmd}`);
      throw new Error();
    }
    shell.popd();
  };
}
