//Dependances
'use strict';
const electron = require('electron');
var chalk = require('chalk');
var events = require('events');
var eventEmitter = new events.EventEmitter();
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

//define the mainWindow
let mainWindow;
function createWindow () {
  //set the size and the content of the window
  console.log(chalk.green("window started"));
  mainWindow = new BrowserWindow({width: 800, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();

  //what to do when the window(s) is close
  mainWindow.on('closed', function() {
    console.log(chalk.red("window closed"));
    mainWindow = null;
  });

}

//What to do when the app is closed
app.on('window-all-closed', function () {
  console.log(chalk.red("App closed"));
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//to keep alive the window on MAC_OS system
app.on('activate', function () {
  console.log(chalk.green("windows is alive !"));
  if (mainWindow === null) {
    createWindow();
  }
});

//Call the createWindow function
app.on('ready', createWindow);
