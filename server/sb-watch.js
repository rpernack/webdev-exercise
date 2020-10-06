'use strict';

const _ = require('lodash');
const chokidar = require('chokidar');
const renderAssets = require('./render-assets');
const renderSCSS = require('./render-scss');

const watcher = chokidar.watch('src', {
    persistent: true,
});

let READY = false;

process.stdout.write('Loading');

watcher.on('add', filePath => _processFile(filePath, 'add'));
watcher.on('change', filePath => _processFile(filePath, 'change'));
watcher.on('ready', () => {
    READY = true;
    console.log(' READY TO ROLL!');
});

_handleSCSS();

function _processFile(filePath, watchEvent) {

    console.log(`### INFO: File event: ${watchEvent}: ${filePath}`);

    if (filePath.match(/\.scss$/)) {
        if (watchEvent === 'change') {
            return _handleSCSS(filePath, watchEvent);
        }
        return;
    }

    if (filePath.match(/src\/assets\//)) {
        return renderAssets();
    }
    if (filePath.match(/src\/html\//)) {
        return renderHtml();
    }

}

function _handleSCSS() {
    renderSCSS();
}
