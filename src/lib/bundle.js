// #!/usr/bin/env node
'use strict';
import path from 'path';
import config from './config';
import Log from './log';
import subprocess from './subprocess';

const log = new Log();

var OPENAPI_JSON_PATH = path.join(config.branchPath, 'openapi.json');
var OPENAPI_YAML_PATH = path.join(config.branchPath, 'openapi.yaml');

const bundleSpec = () => {
    log.preview({
        'title': '\nBranch folder',
        'text': `${config.branchPath}/`
    })

    subprocess.makeDirs(config.branchPath);
    var specDir = path.join(config.root, 'spec');
    subprocess.makeDirs(specDir);
    var specPath = path.join(config.root, config.apiSpecPath);
    
    log.preview({
        'title': '\nAPI spec (root) location',
        'text': specPath
    })

    subprocess.copy(specPath, path.join(config.root, 'spec/openapi.yaml'));

    log.info("\nBundling API spec...");
    log.preview({
        'title': "\nStoring bundled 'openapi.json' and 'openapi.yaml' in",
        'text': `${config.branchPath}/\n`
    });

    subprocess.exec(`npx openapi bundle -f --output ${OPENAPI_JSON_PATH} ${config.apiSpecPath}`);
    subprocess.exec(`npx openapi bundle -f --output ${OPENAPI_YAML_PATH} ${config.apiSpecPath}`);
    subprocess.removeDirs(specDir);
};

export default bundleSpec;