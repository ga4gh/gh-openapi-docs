#!/usr/bin/env node

const updater = require('update-notifier');
const parseArgs = require('yargs-parser');
const pkg = require('../package.json');
const release = require('../src');

const aliases = {
  c: 'config',
  d: 'dry-run',
  h: 'help',
  v: 'version',
  V: 'verbose'
};

const parseCliArguments = function(args) {
  const options = parseArgs(args, {
    boolean: ['dry-run'],
    alias: aliases,
    default: {
      'dry-run': false,
      verbose: 0
    },
    count: ['verbose'],
    configuration: {
      'parse-numbers': false
    }
  });
  return options;
};

const options = parseCliArguments([].slice.call(process.argv, 2));
updater({ pkg: pkg }).notify();
release(options).then(function() { process.exit(0) }, function() { process.exit(1) });