import pkg from '../../package.json';
import { Command } from 'commander';
import process from 'process';

const program = new Command();
program.version(pkg.version);
program
  .option('-c --config <config>', `Path to local configuration options [default: ".spec-docs.json"]`, ".spec-docs.json")
  .option('-d --dry-run [bool]', `Do not touch or write anything, but show the commands`, false)
  .option('-o --output-dir <output_dir>', `Output directory containing built docs added to the current checkout of 'gh-pages'`, "publish")
  .option('-v --verbose [bool]', `Verbose output`, false);
program.parse(process.argv)
let cliOpts = program.opts();

export default cliOpts;
