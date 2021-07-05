import pkg from '../../package.json';
import { Command } from 'commander';
import process from 'process';

const program = new Command();
program.version(pkg.version);
program
  .option('-c --config <config>', `Path to local configuration options [default: ".spec-docs.json"]`)
  .option('-d --dry-run [bool]', `Do not touch or write anything, but show the commands`, false)
  .option('-V --verbose [bool]', `Verbose output`, false);
program.parse(process.argv)
let cliOpts = program.opts();

export default cliOpts;
