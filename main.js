//Dependance
'use strict';
const electron = require('electron');

var Promise = require("bluebird");
var Promise = require("grunt");
//var Promise = require("winston");
var chalk = require('chalk');

console.log(chalk.blue("Debut du programme"));


/*
//Horloge qui appel une focntion a chaque heure
var globalTime = 0;
var timer = setInterval(
  function updateTime(){
    console.log(chalk.blue("tic",globalTime));
    if (globalTime < 23){
      globalTime+=1;
    }else{
      globalTime=0;
    }
  }
,1000);

*/
function rand(low, high) {
    return Math.random() * (high - low) + low;
}



const nbClient = 1;
const nbresto = 2;
var listClients = [];
var listResto = [];



var client = function(){

  this.findResto = function (){
    return listResto[rand(0,listResto.length)]
  }

  this.findResto = function (){

  }

}


var resto = function(){

}


var listclients = [];
for (var i = 0; i < nbClient; i++) {
    listclients[i] = new client();
}

var listResto = [];
for (var i = 0; i < nbresto; i++) {
    listResto[i] = new resto();
}



/*
var events = require('events');
var eventEmitter = new events.EventEmitter();

var connectHandler = function connected(){
  console.log('connection reussie');
  eventEmitter.emit('connected');
}

eventEmitter.on('connection',connectHandler);

eventEmitter.on('connection',function(){
  console.log('donnee bien recue');
});

eventEmitter.emit('connection');
console.log('fini');
*/






/*

var produit = 0;

function appel_producteur(){
    producteur.next();
}

function* p(){
  var compteur = 0;
  while(true){
    compteur++;
    produit = compteur;
    console.log("production " + produit);
    setTimeout(appel_consomateur,0);
    yield null;
  }
}


function appel_consomateur(){
  consomateur.next();
}

function* c(){
  while(true){
    console.log("consomation "+produit);
    setTimeout(appel_producteur,0);
    yield null;
  }
}

var producteur = p();
var consomateur = c();
producteur.next();
*/










/*
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

*/




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
