// #!/usr/bin/env node
'use strict';
import path from 'path';
import config from './config';
import Log from './log';
import {cp, exec, mkdir, rm, subprocess} from './subprocess';

const log = new Log();

var OPENAPI_JSON_PATH = path.join(config.branchPath, 'openapi.json');
var OPENAPI_YAML_PATH = path.join(config.branchPath, 'openapi.yaml');

const bundleSpec = () => {
    log.preview({
        'title': '\nBranch folder',
        'text': `${config.branchPath}/`
    })

    subprocess(mkdir, '-p', config.branchPath).runAndAssert();
    var specDir = path.join(config.root, 'spec');
    subprocess(mkdir, '-p', specDir).runAndAssert();
    var specPath = path.join(config.root, config.apiSpecPath);
    
    log.preview({
        'title': '\nAPI spec (root) location',
        'text': specPath
    })

    subprocess(cp, specPath, path.join(config.root, 'spec/openapi.yaml')).runAndAssert();

    log.info("\nBundling API spec...");
    log.preview({
        'title': "\nStoring bundled 'openapi.json' and 'openapi.yaml' in",
        'text': `${config.branchPath}/\n`
    });

    subprocess(exec, `npx openapi bundle -f --output ${OPENAPI_JSON_PATH} ${config.apiSpecPath}`).runAndAssert();
    subprocess(exec, `npx openapi bundle -f --output ${OPENAPI_YAML_PATH} ${config.apiSpecPath}`).runAndAssert();
    subprocess(rm, '-rf', specDir);
};

export default bundleSpec;