// #!/usr/bin/env node
'use strict';
import shell from 'shelljs';
import path from 'path';
import config from './config';
import themes from './theme';
import Log from './log';

const log = new Log();

const constructOptsArg = (themes, themeName) => {
    if (themeName == 'default') {
        return '';
      } else {
        let argStr = `--options='${JSON.stringify(themes[themeName])}'`;
        return argStr
    }
}

const setupUI = buildPage => {
    var redocOpts = constructOptsArg(themes, config.redocTheme);
    var uiPath = path.join(config.branchPath, config.docsRoot);
    shell.mkdir('-p', uiPath);
    var indexPath = path.join(uiPath, buildPage.htmlOutfile);
    let openApiYamlPath = path.join(config.branchPath, buildPage.yamlOutfile);
    log.preview({
        title: 'Generating standalone ReDoc HTML',
        text: `${indexPath}\n`
    });
    
    shell.exec(
        `redoc-cli bundle --output ${indexPath} ${openApiYamlPath} ${redocOpts}`,
        {silent: false}
    );
};

export { setupUI };
