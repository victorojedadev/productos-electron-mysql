const { createWindow } = require('./main');
const { app } = require('electron');
const reload = require('electron-reload');

require('./database');
reload(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);