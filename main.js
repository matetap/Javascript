//Dependance
'use strict';
var Promise = require("bluebird");
var Promise = require("grunt");
var Promise = require("winston");
const electron = require('electron');

console.log("Debut du programme");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600});
  //mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

}

//appelle createWindow lorsque la fenetre est prette
app.on('ready', createWindow);

//s'execute quand on ferme la fenetre
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//Pour garder la fenetre vivante
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
