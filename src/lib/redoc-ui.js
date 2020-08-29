// #!/usr/bin/env node
'use strict';
import shell from 'shelljs';
import path from 'path';
import config from '@lib/config';
import themes from '@lib/theme';
import Log from '@lib/log';

const log = new Log();
var OPENAPI_YAML_PATH = path.join(config.branchPath, 'openapi.yaml');

const constructOptsArg = (themes, themeName) => {
    if (themeName == 'default') {
        return '';
      } else {
        let argStr = `--options='${JSON.stringify(themes[themeName])}'`;
        return argStr
    }
}

const setupUI = () => {
    var redocOpts = constructOptsArg(themes, config.redocTheme);
    var uiPath = path.join(config.branchPath, config.docsRoot);
    shell.mkdir('-p', uiPath);
    var indexPath = path.join(uiPath, 'index.html');
    log.preview({
        title: 'Generating standalone ReDoc HTML',
        text: `${indexPath}\n`
    });
    shell.exec(
        `redoc-cli bundle --output ${indexPath} ${OPENAPI_YAML_PATH} ${redocOpts}`,
        {silent: true}
    );
};

export { setupUI };