//Dependances
'use strict';
const electron = require('electron');
var chalk = require('chalk');
var events = require('events');
var eventEmitter = new events.EventEmitter();


//Set constant value
const msForOneHour = 1000;
const timings = {
  hour : msForOneHour ,
  buyFoodMin : 0.15 * msForOneHour ,
  buyFoodMax : 1.15 * msForOneHour,
  makeFoodMin : 0.05 * msForOneHour ,
  makeFoodMax : 0.5 * msForOneHour,
  clientWait : 0.1 * msForOneHour,
  clientResistMin : 0.1 * msForOneHour,
  clientResistMax : 0.4 * msForOneHour,
  eventLoopTic : 0.01 * msForOneHour,
  tenMin : 0.1 * msForOneHour,
  fiveMin : 0.05 * msForOneHour,
  oneMin : 0.01 * msForOneHour,
  oneDay : 24 * msForOneHour
};
const hourInOneDay = 24;
const minInOnehour = 100;



//some global parameter
var nbClient;
var nbRestaurants;
var globalTime;
var listMenu;


//function for generate random indeteger between low and high
function rand(low, high) {
     return Math.floor(Math.random() * (high - low + 1) + low);
}


//The start function, genere the div for display in electron
function start(){

  //Get the previous value
  nbClient = document.getElementById("input_nb_client").value;
  nbRestaurants = document.getElementById("input_nb_restaurant").value;

  var menu1 = {
    chiken:1,
    potato:1,
    steak:0,
    salad:0
  };

  var menu2 = {
    chiken:0,
    potato:0,
    steak:1,
    salad:1
  };

  var menu3 = {
    chiken:0,
    potato:0,
    steak:0,
    salad:1
  };

  listMenu = [];
  if(document.getElementById('menu1').checked){
    listMenu.push(menu1);
  }
  if(document.getElementById('menu2').checked){
    listMenu.push(menu2);
  }
  if(document.getElementById('menu3').checked){
    listMenu.push(menu3);
  }

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
      document.getElementById("time").innerHTML = ("Curent time : " + Math.floor((globalTime/minInOnehour)) + " h " + (globalTime -(Math.floor((globalTime/minInOnehour))*minInOnehour)) +" min");
      if (globalTime < hourInOneDay*minInOnehour){
        globalTime+=1;
      }else{
        globalTime=0;
      }
    }
  ,timings.oneMin);

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
    return rand(timings.buyFoodMin,timings.buyFoodMax);
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

    setTimeout(this.emit.bind(this, 'loop'), timings.eventLoopTic);
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
  var stock = {
    chiken:0,
    potato:0,
    steak:0,
    salad:0
  }

  //State of the store
  var open = false
  //Score of this restaurant
  var score = 0;
  this.upScore = function(bonus){
    score +=bonus;
  }

  //Is the store open at this time ? has it food ?
  this.isOpen = function(){
    return open;
  }

  //When somone want to buy us food, it take betwen 0h05 and 0h50
  this.makeFood = function(menu){
    stock.chiken -= menu.chiken;
    stock.potato -= menu.potato;
    stock.steak -= menu.steak;
    stock.salad -= menu.salad;
    return rand(timings.makeFoodMin,timings.makeFoodMax);
  }

  function buyfood(size){
    stock.chiken +=size;
    stock.potato +=size;
    stock.steak +=size;
    stock.salad +=size;
  }

  this.isAvailable = function(menu){
    if(stock.chiken >= menu.chiken){
      if(stock.potato >= menu.potato){
        if(stock.steak >= menu.steak){
          if(stock.salad >= menu.salad){
            return true;
          }
        }
      }
    }
  }

  //Internal loop of restaurant
  this.on('loop', function () {

    //is it time to open the store ? Have we food for make 1 menu ?
    document.getElementById("restaurant"+id).innerHTML = ('restaurant n°'+id+'<br>Food stock (chiken,potato,steak,salad):<br>'+stock.chiken+','+stock.potato+','+stock.steak+','+stock.salad+'<br>Score : '+score+'<br>');
    if((stock.salad>0 || stock.chiken>0 ) && ((globalTime>amOp && globalTime < amCl)||(globalTime>pmOp && globalTime < pmCl))){
      //Yes, open
      document.getElementById("restaurant"+id).style.backgroundColor = 'green';
      open = true;
    }else{
      //No close
      document.getElementById("restaurant"+id).style.backgroundColor = 'red';
      open = false;
      //We dont have food

      if(stock.salad<1 && stock.chiken<1 ){
        document.getElementById("restaurant"+id).innerHTML += ('Out of food<br>');
        //Can we buy it at rungis at this time ?
        if (rungis.isOpen()){
          document.getElementById("restaurant"+id).style.backgroundColor = 'blue';
          //Buy it !
          var waitingTime = rungis.buy();
          document.getElementById("restaurant"+id).innerHTML += ('buying food at Rungis, waiting ',waitingTime,' <br>');
          setTimeout(buyfood(10),waitingTime);
       }
      }
    }

    setTimeout(this.emit.bind(this, 'loop'), timings.eventLoopTic);
  });

}restaurant.prototype.__proto__ = events.EventEmitter.prototype;


//define the client object
function client(tmp_id) {
  events.EventEmitter.call(this);

  //id for the client instance
  var id=tmp_id;

  //State of the client
  var hungry=true
  var waitResit = rand(timings.clientResistMin,timings.clientResistMax);

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
        setTimeout(this.emit.bind(this, 'loop'), timings.clientWait);
      }else{
        //if it's, go in
        document.getElementById("client"+id).innerHTML += ('<br>'+'Open ! i ask for food');
        document.getElementById("client"+id).style.backgroundColor = 'green';

        //choice a menu
        var tmp = rand(0,2);
        while(!listRestaurants[choice].isAvailable(listMenu[tmp])){
          tmp = rand(0,2);
        }

        var waitingTime = listRestaurants[choice].makeFood(listMenu[tmp]);

        document.getElementById("client"+id).innerHTML += ('buying food at restaurant n°',choice,' waiting ',waitingTime,' <br>');
        if (waitingTime>waitResit){
          document.getElementById("client"+id).innerHTML += ('It is more than my wait resist <br>');
        }
        if (waitingTime<(waitResit-timings.tenMin)){
          listRestaurants[choice].upScore(2);
        }else if (waitingTime<(waitResit+timings.fiveMin)){
            listRestaurants[choice].upScore(1);
        }

        document.getElementById("client"+id).innerHTML += ('I have eat !<br>');
        hungry = true;
        setTimeout(this.emit.bind(this, 'loop'), waitingTime);

      }

    }else{
      setTimeout(this.emit.bind(this, 'loop'), timings.eventLoopTic);
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
