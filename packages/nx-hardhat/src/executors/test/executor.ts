import { ExecutorContext } from '@nrwl/devkit';
import { TestExecutorSchema } from './schema';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { runHardhatCommand } from '../../hardhat-utils';

export default async function runExecutor(
  options: TestExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Test', options);

  const workspaceRoot = getWorkspaceRoot(context);
  const projectRoot = getProjectRoot(context);

  try {
    runHardhatCommand(workspaceRoot, projectRoot, 'test');
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
