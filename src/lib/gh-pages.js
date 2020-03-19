'use strict';
import shell from 'shelljs';
import path from 'path';
import config from './config';
import Log from './log';

const log = new Log();

const fetchPages = () => {
    shell.rm('-rf', '.ghpages-tmp');
    shell.mkdir('-p', '.ghpages-tmp');
    var startDir = shell.pwd();
    shell.cd('.ghpages-tmp');
    log.log(`Cloning 'gh-pages' branch into '${shell.pwd().stdout}'`);
    shell.exec(`git clone --depth=1 --branch=gh-pages ${config.repoOrigin} .`);
    shell.cp('-Rn', '.', config.root)
    shell.cd(startDir);
    shell.rm('-rf', '.ghpages-tmp')
};

// TODO: add logic to move all rendered artifacts to correct location
// prior to gh-pages deploy
const stagePages = () => {
    if (config.branch != 'gh-pages' ) {

        var docsPath = path.join(config.branchPath, config.docsRoot);
        log.log(`Moving rendered docs to '${docsPath}'`);
        // cp('docs/html5/index.html', docspath)
        // cp('docs/pdf/index.pdf', docspath)
        // cp('docs/asciidoc/*.png', docspath)
        // cp -R web_deploy/* "$branchpath/"
    }
}

// stagePages()
export { fetchPages, stagePages };
