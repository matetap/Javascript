//Dependances
'use strict';
const electron = require('electron');
var Promise = require("bluebird");
var Promise = require("grunt");
//var Promise = require("winston");
var chalk = require('chalk');
var events = require('events');
var eventEmitter = new events.EventEmitter();


const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
function createWindow () {

  console.log(chalk.green("window started"));
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/parameter.html');
  mainWindow.webContents.openDevTools();


  //a la fermeture de la fenetre
  mainWindow.on('closed', function() {
    console.log(chalk.red("window closed"));
    mainWindow = null;
  });

}

//s'execute quand on ferme le'app'
app.on('window-all-closed', function () {
  console.log(chalk.red("App closed"));
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//Pour garder la fenetre vivante
app.on('activate', function () {
  console.log(chalk.green("windows is alive !"));
  if (mainWindow === null) {
    createWindow();
  }
});


//appelle createWindow lorsque la fenetre est prette
app.on('ready', createWindow);
