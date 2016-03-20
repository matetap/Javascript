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
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools();


  //a la fermeture de la fenetre
  mainWindow.on('closed', function() {
    console.log("windows closed");
    mainWindow = null;
  });

}

//s'execute quand on ferme le'app'
app.on('window-all-closed', function () {
  console.log("App closed");
  setTimeout(function(){
  clearTimeout(timer);
  console.log("timer removed");
  },1000);
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//Pour garder la fenetre vivante
app.on('activate', function () {
  console.log("windows is alive !");
  if (mainWindow === null) {
    createWindow();
  }
});


//appelle createWindow lorsque la fenetre est prette
app.on('ready', createWindow);

//Test timer
var timer = setInterval(
function tic(){
console.log("tic");
},1000);
