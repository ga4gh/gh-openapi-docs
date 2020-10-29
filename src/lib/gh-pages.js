'use strict';
import shell from 'shelljs';
import config from './config';
import Log from './log';
import fs from 'fs';
import {cd, cp, exec, mkdir, rm, subprocess} from './subprocess';

const log = new Log();

const fetchPages = () => {

    subprocess(rm, '-rf', '.ghpages-tmp').runAndAssert();
    subprocess(mkdir, '-p', '.ghpages-tmp').runAndAssert();
    var startDir = shell.pwd();
    subprocess(cd, '.ghpages-tmp').runAndAssert();

    log.log(`\nCloning 'gh-pages' branch into '${shell.pwd().stdout}'`);

    subprocess(exec, `git clone --depth=1 --branch=gh-pages ${config.repoOrigin} .`).runAndAssert();

    if (fs.existsSync(config.branchPathBase)) {
        subprocess(cp, '-Rn', config.branchPathBase, config.root).runAndAssert();
    }
    if (fs.existsSync(config.docsRoot)) {
        subprocess(cp, '-Rn', config.docsRoot, config.root).runAndAssert();
        subprocess(cp, '-Rn', 'openapi.*', config.root);
    }

    subprocess(cd, startDir).runAndAssert();
    subprocess(rm, '-rf', '.ghpages-tmp').runAndAssert();
};

export { fetchPages };
