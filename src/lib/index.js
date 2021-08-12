import runTasks from './tasks';

const release = async () =>  {
  return runTasks();
  return Promise.resolve();
}

export default release;