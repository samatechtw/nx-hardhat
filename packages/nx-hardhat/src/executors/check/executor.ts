import { ExecutorContext } from '@nrwl/devkit';
import { CheckExecutorSchema } from './schema';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { runHardhatCommand } from '../../hardhat-utils';

export default async function runExecutor(
  options: CheckExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Check', options);

  const workspaceRoot = getWorkspaceRoot(context);
  const projectRoot = getProjectRoot(context);

  try {
    const result = runHardhatCommand(workspaceRoot, projectRoot, 'check');
    const success = !result.stdout.includes(' error ');
    return { success };
  } catch (e) {
    return { success: false };
  }
}
