#!/usr/bin/env node
'use strict';
const shell = require('shelljs');
const path = require('path');
const config = require('./config');
const Log = require('./log');
const $RefParser = require("json-schema-ref-parser");
let YAML = $RefParser.YAML;

const log = new Log();

var SWAGGER_JSON_PATH = path.join(config.branchPath, 'openapi.json');
var SWAGGER_YAML_PATH = path.join(config.branchPath, 'openapi.yaml');

const bundleSpec = async function() {
    shell.mkdir('-p', 'spec');
    // shell.mkdir('-p', 'web_deploy');

    var specPath = path.join(config.root, config.apiSpecPath);
    var baseDir = path.dirname(specPath);
    // shell.cp('-r', `${baseDir}/*`, 'spec');
    shell.cp(specPath, 'spec/openapi.yaml');

    log.log("\nBundling API spec...");
    // try {
    //     let schema = await $RefParser.bundle(specPath);
    //     // console.log(schema);
    //     console.log(YAML.stringify(schema.paths['/echo'].post.responses['200'].headers['X-Expires-After']));
    // }
    //     catch(err) {
    //     console.error(err);
    // }
    shell.exec(
        `npm run swagger bundle --        -o ${SWAGGER_JSON_PATH}`
    );
    shell.exec(
        `npm run swagger bundle -- --yaml -o ${SWAGGER_YAML_PATH}`
    );
    shell.rm('-rf', 'spec');
};

// bundleSpec()
module.exports.bundleSpec = bundleSpec;