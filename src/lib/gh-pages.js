'use strict';
import shell from 'shelljs';
import config from './config';
import Log from './log';
import fs from 'fs';
import subprocess from './subprocess';

const log = new Log();

const fetchPages = () => {

    subprocess.removeDirs('.ghpages-tmp');
    subprocess.makeDirs('.ghpages-tmp');
    var startDir = shell.pwd();
    subprocess.changeDir('.ghpages-tmp');

    log.log(`\nCloning 'gh-pages' branch into '${shell.pwd().stdout}'`);

    subprocess.exec(`git clone --depth=1 --branch=gh-pages ${config.repoOrigin} .`);

    if (fs.existsSync(config.branchPathBase)) {
        subprocess.copyDirsN(config.branchPathBase, config.root);
    }
    if (fs.existsSync(config.docsRoot)) {
        subprocess.copyDirsN(config.docsRoot, config.root);
        subprocess.copyDirsN('openapi.*', config.root);
    }

    subprocess.changeDir(startDir);
    subprocess.removeDirs('.ghpages-tmp');
};

export { fetchPages };
