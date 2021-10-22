import { HardhatConfig, HardhatUserConfig } from 'hardhat/types';
import { ExecutorContext } from '@nrwl/devkit';
import hardhat from 'hardhat';
import { extendConfig } from 'hardhat/config';
import {
  TASK_NODE,
  TASK_TEST,
  TASK_COMPILE,
  TASK_NODE_SERVER_READY,
} from 'hardhat/builtin-tasks/task-names';
import { BuildExecutorSchema } from './schema';
import { getProjectRoot, getWorkspaceRoot } from '../../utils';
import { runHardhatCommand } from '../../hardhat-utils';

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Build', options);

  const workspaceRoot = getWorkspaceRoot(context);
  const projectRoot = getProjectRoot(context);

  try {
    const command = runHardhatCommand(workspaceRoot, projectRoot, 'compile');

    if (!command) {
      return { success: false };
    }

    command();
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
