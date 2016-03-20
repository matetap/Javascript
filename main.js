//Dependance
'use strict';
const electron = require('electron');

var Promise = require("bluebird");
var Promise = require("grunt");
//var Promise = require("winston");
var chalk = require('chalk');

console.log(chalk.blue("Debut du programme"));


//Horloge qui appel une focntion a chaque heure
var globalTime = 0;
var timer = setInterval(
  function updateTime(){
    console.log(chalk.blue("tic",globalTime));
    if (globalTime < 23){
      globalTime++;
    }else{
      globalTime=0;
    }
  }
,1000);


var marche =(function(op,cl){

  marche.isopen = function(){
    if(globalTime>op && globalTime < cl){
      return true;
    }else{
      return false;
    }
  }

})




var restaurant =(function(amOp,amCl,pmOp,pmCl){

  var patate = 0;
  var steak = 0;
  var carote = 0;
  var salade = 0;

  restaurant.getFood = function(){
    if (marche.isopen()){
      patate = 10;
      steak = 10;
      carote = 10;
      salade = 10;
      var end = globalTime + 5;
      while (globalTime < end);
    }
  }

  restaurant.isopen = function(){
    if((globalTime>amOp && globalTime < amCl)||(globalTime>pmOp && globalTime < pmCl) ){
      return true;
    }else{
      return false;
    }
  }

  restaurant.makeMesandwitch = function(){
    if (true) {
      var end = globalTime + 5;
      while (globalTime < end);
      return true
    }else{
      return false
    }
  }


})


var client =(function(amOp,amCl,pmOp,pmCl){



})


var Rungis = new marche(11,15,18,23);
var Resto = new restaurant(11,15,18,23);
var Cli = new client;






/*
const msForOneHour = 1000;
const timings = {
  hour : msForOneHour ,
  chefMin : 0.05 * msForOneHour ,
  chefMax : 0.5 * msForOneHour ,
  // etc.
};
*/



















/*
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools();


  //a la fermeture de la fenetre
  mainWindow.on('closed', function() {
    chalk.red("windows closed");
    mainWindow = null;
  });

}

//s'execute quand on ferme le'app'
app.on('window-all-closed', function () {
  chalk.red("App closed");
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
  chalk.green("windows is alive !");
  if (mainWindow === null) {
    createWindow();
  }
});


//appelle createWindow lorsque la fenetre est prette
app.on('ready', createWindow);
*/
