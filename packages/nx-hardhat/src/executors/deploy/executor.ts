import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { DeployExecutorSchema } from './schema';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { runHardhatCommand } from '../../hardhat-utils';

export default async function runExecutor(
  options: DeployExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Deploy', options);

  const workspaceRoot = getWorkspaceRoot(context);
  const projectRoot = getProjectRoot(context);

  const { script, network } = options;
  const resolvedScript = joinPathFragments(projectRoot, script);

  try {
    runHardhatCommand(
      workspaceRoot,
      projectRoot,
      'run',
      '--network',
      network,
      resolvedScript
    );
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
