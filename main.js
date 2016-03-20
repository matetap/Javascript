//Dependances
'use strict';
const electron = require('electron');
var Promise = require("bluebird");
var Promise = require("grunt");
//var Promise = require("winston");
var chalk = require('chalk');
var events = require('events');
var eventEmitter = new events.EventEmitter();


var globalTime = 0;
//Timer for get and increase the current time
var timer = setInterval(
  function updateTime(){
    console.log(chalk.blue("Il est : ",globalTime, " h"));
    if (globalTime < 23){
      globalTime+=1;
    }else{
      globalTime=0;
    }
  }
,1000);


//function for generate random indeteger between low and high
function rand(low, high) {
     return Math.floor(Math.random() * (high - low + 1) + low);
}


//some cosntant parameter
const nbClient = 2;
const nbRestaurants = 2;


//The programme is starting
console.log(chalk.blue("Debut du programme"));


//define the actor of this program
var Rungis;
var listRestaurants = [];
var listClients = [];


//define the seller object
function seller(){
  events.EventEmitter.call(this);
}seller.prototype.__proto__ = events.EventEmitter.prototype;


//define the restaurants object
function restaurant(amOp,amCl,pmOp,pmCl){
  events.EventEmitter.call(this);

  this.isOpen = function(){
    if((globalTime>amOp && globalTime < amCl)||(globalTime>pmOp && globalTime < pmCl) ){
      return true;
    }else{
      return false;
    }
  }

}restaurant.prototype.__proto__ = events.EventEmitter.prototype;


//define the client object
function client() {
  events.EventEmitter.call(this);

  this.findRestaurants = function () {
    var choice = rand(0,listRestaurants.length-1);
    console.log(chalk.green("choice ", choice));

    if(!listRestaurants[choice].isOpen()){
      console.log(chalk.green("Not open. i wait 10min "));
      setTimeout(function () {
          console.log(chalk.green("Not open. i wait 10min "));
          this.emit('hungry');
      }, 1000);
    }else{
      console.log(chalk.green("Open !"));
    }

  }

  this.on('hungry', function () {
    this.findRestaurants();
  });

}client.prototype.__proto__ = events.EventEmitter.prototype;


//initialise the seller
Rungis = new seller();
//initialise the restaurants
for (var i = 0; i < nbClient; i++) {
    listRestaurants[i] = new restaurant(11,15,18,23);
}
//initialise the client
for (var i = 0; i < nbRestaurants; i++) {
    listClients[i] = new client();
}

//start the game
for (var i = 0; i < 1; i++) {
    console.log(chalk.green("Set client ",i," hungry"));
    listClients[i].emit('hungry');
}





/*
//Le client choisi un restorant
resto_voulu = listclients[0].findResto();
console.log("choisi le resto :", chalk.blue(resto_voulu));

//Le client essaye de rentrer dans le restorant
  if (!listResto[resto_voulu].isOpen()){
    console.log(chalk.red("client 0 n'a pas pu rentrer dans le restaurant", resto_voulu,", il attend 10min"));
    setTimeout(function () {
      eventEmitter.emit('try_enter');
    }, 1000);
  }else{
    console.log(chalk.green("client 0 rentre dans le restaurant", resto_voulu));
    //une fois dedans il commande
    listResto[resto_voulu].makeMeSandwitch('food_ready');
    console.log(chalk.green("j'attedn ma bouffe"));
  }*/




/*

var Marchant = function(openTime,closetime){

  this.getFood = function(){
    var delay = rand(0,12500);
    console.log(chalk.red("wait : ", delay, " min"));

    var eventName = rand(0,10000000);
    setTimeout(function () {
        eventEmitter.emit(eventName);
    }, delay);
    return eventName;
  }

}



//initialise the actor
Rungis = new Marchant(5,14);

//ask to Rungis for some food
var name = Rungis.getFood();
eventEmitter.on(name,function(){
  //Callback say it's done
  console.log(chalk.red("fini"));

});
*/





















/*
var client = function(){

  function choiceRestaurant(){
    return
  }


  this.loop = function(){
    choiceRestaurant();
  }

}


//initialise all the client
for (var i = 0; i < nbClient; i++) {
    listClients[i] = new client();
}


//start all the client
for (var i = 0; i < nbClient; i++) {
    listClients[i].loop();
}*/









/*





var resto = function(amOp,amCl,pmOp,pmCl){

  this.isOpen = function(){
    if((globalTime>amOp && globalTime < amCl)||(globalTime>pmOp && globalTime < pmCl) ){
      return true;
    }else{
      return false;
    }
  }

  this.makeMeSandwitch = function (eventName){
    setTimeout(function () {
        eventEmitter.emit(eventName);
    }, 1000);

  }

}

var marchant = function(){

  this.isOpen = function(){
    if(globalTime>op && globalTime < cl){
      return true;
    }else{
      return false;
    }
  }



}


//Initialsiation des different participant
var rungis = new marchant();

var listResto = [];
for (var i = 0; i < nbresto; i++) {
    listResto[i] = new resto(11,15,18,23);
}





var client = function(){
  events.EventEmitter.call(this);

  var faim = true;


  this.findResto = function (){
    resto_voulu = listclients[0].findResto();
    console.log("choisi le resto :", chalk.blue(resto_voulu));
    return rand(0,listResto.length-1);
  }



  this.enterResto = function (){
    eventEmitter.on('try_enter',function(){

      //Le client choisi un restorant
      resto_voulu = listclients[0].findResto();
      console.log("choisi le resto :", chalk.blue(resto_voulu));

      //Le client essaye de rentrer dans le restorant
        if (!listResto[resto_voulu].isOpen()){
          console.log(chalk.red("client 0 n'a pas pu rentrer dans le restaurant", resto_voulu,", il attend 10min"));
          setTimeout(function () {
            eventEmitter.emit('try_enter');
          }, 1000);
        }else{
          console.log(chalk.green("client 0 rentre dans le restaurant", resto_voulu));
          //une fois dedans il commande
          listResto[resto_voulu].makeMeSandwitch('food_ready');
          console.log(chalk.green("j'attedn ma bouffe"));
        }

    });
  }






  this.entre = function(restaurant){
      if (!restaurant.isOpen()){
        console.log(chalk.red("client 0 n'a pas pu rentrer dans le restaurant", resto_voulu,", il attend 10min"));

     }else{
        console.log(chalk.green("client 0 rentre dans le restaurant", resto_voulu));
        return true;
     }
  }


}




var listclients = [];
for (var i = 0; i < nbClient; i++) {
    listclients[i] = new client();
}

console.log(chalk.green("client 0 rentre dans le restaurant"));
setTimeout(appel_producteur,1000);
console.log(chalk.green("client 0 rentreddddddant"));
// si il a faim
//if (listclients[0].faim){

//listclients[0].loop();

//listclients[1].loop();*/
/*
eventEmitter.emit('try_enter');

eventEmitter.on('food_ready',function(){
  console.log(chalk.green("j'ai ma bouffe !!"));
});*/










/*
for (var i = 0; i < nbClient; i++) {
    istclients[i].next();
}




console.log(chalk.red("j'attedn"));
setTimeout(function () {
  console.log('snif')
}, 5000)
console.log(chalk.red("fini"));

*/



/*


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
