const fs = require('fs-extra')
const path = require('path');
const config = require('./config');

const createConfig = function() {
    var sphinxdocrcPath = path.resolve(config.root, '.sphinxdocrc');
    // var sphinxdocrcPyPath = path.resolve(
    //     config.root,
    //     '.sphinxdocrc.py'
    // );
    // if (fs.existsSync(sphinxdocrcPyPath)) sphinxdocrcPath = sphinxdocrcPyPath;
    if (fs.existsSync(sphinxdocrcPath)) {
        fs.copy(
            sphinxdocrcPath,
            path.resolve(config.docsRoot, 'conf.py')
        );
    }
};

createConfig()