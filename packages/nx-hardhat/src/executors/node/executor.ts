import { ExecutorContext } from '@nrwl/devkit';
import { NodeExecutorSchema } from './schema';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { runHardhatCommand } from '../../hardhat-utils';

export default async function runExecutor(
  options: NodeExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Node', options);

  const workspaceRoot = getWorkspaceRoot(context);
  const projectRoot = getProjectRoot(context);

  try {
    runHardhatCommand(workspaceRoot, projectRoot, 'node', '--no-deploy');
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
