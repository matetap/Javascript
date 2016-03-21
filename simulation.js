//Dependances
'use strict';
const electron = require('electron');
var Promise = require("bluebird");
var Promise = require("grunt");
//var Promise = require("winston");
var chalk = require('chalk');
var events = require('events');
var eventEmitter = new events.EventEmitter();

//some global parameter
var nbClient;
var nbRestaurants;
var globalTime;


//function for generate random indeteger between low and high
function rand(low, high) {
     return Math.floor(Math.random() * (high - low + 1) + low);
}


//The start function, genere the div for display in electron
function start(){

  //Get the previous value
  nbClient = document.getElementById("input_nb_client").value;
  nbRestaurants = document.getElementById("input_nb_restaurant").value;

  //Make the div for the actor of the simulation
  var html="";
  html = html.concat('<div class="timer" id="time" ></div><br><br>');
  html = html.concat('<div class="actor" id="seller0" >Rungis :</div><br><br>');
  for (var i = 0; i < nbRestaurants; i++) {
      html = html.concat('<div class="actor" id="restaurant',i,'">Restaurant n°',i,'</div>');
  }html = html.concat('<br><br>');
  for (var i = 0; i < nbClient; i++) {
      html = html.concat('<div  class="actor" id="client',i,'">Client n°',i,'</div>');
  }html = html.concat('<br><br>');
  document.body.innerHTML = html;

  //Set the global time of the simulation
  globalTime = 0;
  var timer = setInterval(
    function updateTime(){
      document.getElementById("time").innerHTML = ("Curent time : " + Math.floor((globalTime/100)) + " h " + (globalTime -(Math.floor((globalTime/100))*100)) +" min");
      if (globalTime < 2400){
        globalTime+=1;
      }else{
        globalTime=0;
      }
    }
  ,50);

  //initialise the game
  init_actor();
}


//define the seller object
function seller(tmp_id,op,cl) {
  events.EventEmitter.call(this);

  //id for the seller instance
  var id = tmp_id;
  //State of the store
  var open = false;

  //Is the store open at this time ?
  this.isOpen = function(){
    return open;
  }

  //When somone want to buy us food, it take betwen 0h15 and 1h15
  this.buy = function(){
    return rand(15,115);
  }

  //Internal loop of seller
  this.on('loop', function () {

    //Is it time to open ?
    document.getElementById("seller"+id).innerHTML = ('Rungis<br>');
    if(globalTime>op && globalTime < cl){
      //Open
      document.getElementById("seller"+id).style.backgroundColor = 'green';
      open = true;
    }else{
      //Close
      document.getElementById("seller"+id).style.backgroundColor = 'red';
      open = false;
    }

    setTimeout(this.emit.bind(this, 'loop'), 100);
  });

}seller.prototype.__proto__ = events.EventEmitter.prototype;


//define the restaurant object
function restaurant(tmp_id,tmp_amOp,tmp_amCl,tmp_pmOp,tmp_pmCl) {
  events.EventEmitter.call(this);

  //id for the restaurant instance
  var id=tmp_id;

  //Hour of open and close
  var amOp=tmp_amOp;
  var amCl=tmp_amCl;
  var pmOp=tmp_pmOp;
  var pmCl=tmp_pmCl;

  //Food stock
  var food = 0;
  //State of the store
  var open = false

  //Is the store open at this time ? has it food ?
  this.isOpen = function(){
    return open;
  }

  //Internal loop of restaurant
  this.on('loop', function () {

    //is it time to open the store ? Have we food to sell ?
    document.getElementById("restaurant"+id).innerHTML = ('restaurant n°'+id+'<br>Food stock : '+food+'<br>');
    if((food > 0)&&((globalTime>amOp && globalTime < amCl)||(globalTime>pmOp && globalTime < pmCl))){
      //Yes, open
      document.getElementById("restaurant"+id).style.backgroundColor = 'green';
      open = true;
    }else{
      //No close
      document.getElementById("restaurant"+id).style.backgroundColor = 'red';
      open = false;
      //We dont have food
      if(food<1){
        document.getElementById("restaurant"+id).innerHTML += ('Out of food<br>');
        //Can we buy it at rungis at this time ?
        if (rungis.isOpen()){
          document.getElementById("restaurant"+id).style.backgroundColor = 'blue';
          //Buy it !
          var waitingTime = rungis.buy();
          document.getElementById("restaurant"+id).innerHTML += ('buying food at Rungis, waiting ',waitingTime,' <br>');
          setTimeout(food +=10,waitingTime);
       }
      }
    }

    setTimeout(this.emit.bind(this, 'loop'), 100);
  });

}restaurant.prototype.__proto__ = events.EventEmitter.prototype;


//define the client object
function client(tmp_id) {
  events.EventEmitter.call(this);

  //id for the client instance
  var id=tmp_id;

  //State of the client
  var hungry=true

  //Internal loop of client
  this.on('loop', function () {

    if (hungry){
      //we randomly choice one of the restaurant
      var choice = rand(0,listRestaurants.length-1);
      document.getElementById("client"+id).innerHTML = ('Client n°'+id+'<br>'+'Choice restaurant n°'+choice);
      document.getElementById("client"+id).style.backgroundColor = 'red';
      //Is this restorant open ?
      if(!listRestaurants[choice].isOpen()){
        //if it's not, wait 10min
        document.getElementById("client"+id).innerHTML += ('<br>'+'Not open or no food, i wait 10min');
        setTimeout(this.emit.bind(this, 'loop'), 1000);
      }else{
        //if it's, go in
        document.getElementById("client"+id).innerHTML += ('<br>'+'Open ! i ask for food');
        document.getElementById("client"+id).style.backgroundColor = 'green';
        //listRestaurants[choice].makeMeSandwitch(this);
      }

    }else{
      setTimeout(this.emit.bind(this, 'loop'), 100);
    }

  });

}client.prototype.__proto__ = events.EventEmitter.prototype;


//Instance of the used object
var rungis;
var listRestaurants = [];
var listClients = [];


//initialise the object of the simulation
function init_actor() {

  //initialise the seller
  rungis = new seller(0,500,1400);

  //initialise the restaurants
  for (var i = 0; i < nbRestaurants; i++) {
      listRestaurants[i] = new restaurant(i,1100,1500,1800,2300);
  }

  //initialise the client
  for (var i = 0; i < nbClient; i++) {
      listClients[i] = new client(i);
  }

  //start the internal loop of every actor of the simulation
  rungis.emit('loop');
  for (var i = 0; i < nbRestaurants; i++) {
      listRestaurants[i].emit('loop');
  }
  for (var i = 0; i < nbClient; i++) {
      listClients[i].emit('loop');
  }

}







/*

//define the client object
function seller() {
  events.EventEmitter.call(this);

}seller.prototype.__proto__ = events.EventEmitter.prototype;


//define the client object
function restaurant(tmp_id,tmp_amOp,tmp_amCl,tmp_pmOp,tmp_pmCl) {
  events.EventEmitter.call(this);

  //id for the client instance
  var id=tmp_id;
  var amOp=tmp_amOp;
  var amCl=tmp_amCl;
  var pmOp=tmp_pmOp;
  var pmCl=tmp_pmCl;

  //Food stock
  var food = 0;

  //Is the store open at this time ? has it food ?
  this.isOpen = function(){
    if((globalTime>amOp && globalTime < amCl)||(globalTime>pmOp && globalTime < pmCl) ){
      if (food < 1){
        console.log(chalk.red("sorry sir open but there is no food here.. "));
        getfood();
        return false;
      }
      return true;
    }else{
      return false;
    }
  }

  this.makeMeSandwitch = function(client){
      if (food<1){
        getfood();
      }
      setTimeout(client.emit.bind(client, 'foodready'), rand(500,5000));
  }

}restaurant.prototype.__proto__ = events.EventEmitter.prototype;


//define the client object
function client(tmp_id) {
  events.EventEmitter.call(this);

  //id for the client instance
  var id=tmp_id;

  //event client hungry
  this.on('hungry', function () {

    //we randomly choice one of the restaurant
    var choice = rand(0,listRestaurants.length-1);
    document.getElementById("client"+id).innerHTML = ('Client n°'+id+'<br>'+'Choice restaurant n°'+choice);
    document.getElementById("client"+id).style.backgroundColor = 'red';

    //and look if it is open
    if(!listRestaurants[choice].isOpen()){
      //if it's not, wait 10min
      console.log(chalk.red("Not open or no food, i wait 10min "));
      setTimeout(this.emit.bind(this, 'hungry'), 1000);
    }else{
      //if it's, go in
      console.log(chalk.green("Open ! i ask for food"));
      document.getElementById("client"+id).innerHTML = ('Client n°'+id+'<br>'+'Choice restaurant n°'+choice);
      document.getElementById("client"+id).style.backgroundColor = 'red';
      listRestaurants[choice].makeMeSandwitch(this);
    }

  });

}client.prototype.__proto__ = events.EventEmitter.prototype;


//Instance of the used object
var rungis;
var listRestaurants = [];
var listClients = [];


//initialise the object of the simulation
function init_actor() {

  //initialise the seller
  rungis = new seller();

  //initialise the restaurants
  for (var i = 0; i < nbRestaurants; i++) {
      listRestaurants[i] = new restaurant(11,15,18,23);
  }

  //initialise the client
  for (var i = 0; i < nbClient; i++) {
      listClients[i] = new client(i);
      //console.log(listClients[i].id);
  }

  //start the game
  for (var i = 0; i < nbClient; i++) {
      listClients[i].emit('hungry');
  }

}

*/
