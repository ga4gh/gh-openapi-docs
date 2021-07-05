// #!/usr/bin/env node
'use strict';
import shell from "shelljs";
import path from 'path';
import config from './config';
import Log from './log';

const log = new Log();

const bundleSpec = async buildPage => {
    log.preview({
        'title': '\nBranch folder',
        'text': `${config.branchPath}/`
    })
    shell.mkdir('-p', config.branchPath);
    var specDir = path.join(config.root, 'spec');
    shell.mkdir('-p', specDir);

    let specPath = path.join(config.root, buildPage.apiSpecPath);
    let openApiJsonPath = path.join(config.branchPath, buildPage.jsonOutfile);
    let openApiYamlPath = path.join(config.branchPath, buildPage.yamlOutfile);;

    log.preview({
        'title': '\nAPI spec (root) location',
        'text': specPath
    })

    shell.cp(specPath, path.join(config.root, 'spec/openapi.yaml'));

    log.info("\nBundling API spec...");
    log.preview({
        'title': "\nStoring bundled 'openapi.json' and 'openapi.yaml' in",
        'text': `${config.branchPath}/\n`
    });
    shell.exec(
        `npx openapi bundle -f --output ${openApiJsonPath} ${specPath}`,
        {silent: true}
    );
    shell.exec(
        `npx openapi bundle -f --output ${openApiYamlPath} ${specPath}`,
        {silent: true}
    );
    shell.rm('-rf', specDir);
};

export default bundleSpec;