import { CleanExecutorSchema } from './schema';
import executor from './executor';

const options: CleanExecutorSchema = {};

describe('Clean Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
