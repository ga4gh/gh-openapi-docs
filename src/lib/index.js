import { version, help } from '@lib/cli';
import runTasks from '@lib/tasks';

const release = async options =>  {
  if (options.version) {
    version();
  } else if (options.help) {
    help();
  } else {
    return runTasks();
  }
  return Promise.resolve();
}

export default release;