import { ExecutorContext } from '@nrwl/devkit';
import { CleanExecutorSchema } from './schema';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { runHardhatCommand } from '../../hardhat-utils';

export default async function runExecutor(
  options: CleanExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Clean', options);

  const workspaceRoot = getWorkspaceRoot(context);
  const projectRoot = getProjectRoot(context);

  try {
    runHardhatCommand(workspaceRoot, projectRoot, 'clean');
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
