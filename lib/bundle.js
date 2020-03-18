#!/usr/bin/env node
'use strict';
const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const Log = require('./log');

const log = new Log();

var OPENAPI_JSON_PATH = path.join(config.branchPath, 'openapi.json');
var OPENAPI_YAML_PATH = path.join(config.branchPath, 'openapi.yaml');

const bundleSpec = async function() {
    log.preview({
        'title': 'Branch folder',
        'text': config.branchPath
    })
    shell.mkdir('-p', config.branchPath);
    var specDir = path.join(config.root, 'spec');
    shell.mkdir('-p', specDir);

    var specPath = path.join(config.root, config.apiSpecPath);
    log.preview({
        'title': 'Spec location',
        'text': specPath
    })
    shell.cp(specPath, path.join(config.root, 'spec/openapi.yaml'));

    log.log("\nBundling API spec...");
    log.preview({
        'title': 'Storing to',
        'text': OPENAPI_JSON_PATH
    });
    shell.exec(
        `npm run swagger bundle --        -b ${specDir} -o ${OPENAPI_JSON_PATH}`
    );
    shell.exec(
        `npm run swagger bundle -- --yaml -b ${specDir} -o ${OPENAPI_YAML_PATH}`
    );
    shell.rm('-rf', specDir);
};

bundleSpec();
module.exports.bundleSpec = bundleSpec;