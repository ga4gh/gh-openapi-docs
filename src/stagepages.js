#!/usr/bin/env node
'use strict';

require('shelljs/global');
set('-e');
set('-v');

if (process.env.TRAVIS_BRANCH != 'gh-pages' ) {

    if (process.env.TRAVIS_BRANCH == 'master') {
        var branchpath = '.'
    }
    else {
        var branch = process.env.TRAVIS_BRANCH.toLowerCase();
        var branchpath = 'preview/' + branch
    }
    var docspath = branchpath + '/docs'
    echo(docspath)
    mkdir('-p', docspath)
    cp('docs/html5/index.html', docspath)
    cp('docs/pdf/index.pdf', docspath)
    cp('docs/asciidoc/*.png', docspath)
    // cp -R web_deploy/* "$branchpath/"
}

// # do some cleanup
// rm -rf node_modules
// rm -rf web_deploy
// rm -rf spec