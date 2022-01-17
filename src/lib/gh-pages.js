'use strict';
import shell from 'shelljs';
import config from './config';
import Log from './log';
import fs from 'fs';


const log = new Log();

const fetchPages = () => {
    shell.rm('-rf', config.outputDir);
    shell.mkdir('-p', config.outputDir);
    var startDir = shell.pwd();
    shell.cd(config.outputDir);
    log.log(`\nCloning 'gh-pages' branch into '${config.outputDir}'`);
    shell.exec(
        `git clone --depth=1 --branch=gh-pages ${config.repoOrigin} .`,
        {silent: true}
    );
};

export { fetchPages };
