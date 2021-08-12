import '@babel/polyfill';
// const updater = require('update-notifier');
import parseArgs from 'yargs-parser';
// import pkg from '../package.json';
import release from './lib';

// const options = parseCliArguments([].slice.call(process.argv, 2));
// updater({ pkg: pkg }).notify();
process.env.MOCHA_TEST !== true ? release().then(() => process.exit(0), () => process.exit(1)) : null;
