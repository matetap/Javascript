# TP Javascript ESME Sudria 2C

## How to set up :

###Install git :
sudo apt-get update
sudo apt-get install git

###Install node js :
sudo apt-get install nodejs
(you can check if it is install by using the node -v command)

###Install npm :
sudo npm install npm -g

###Install electron :
sudo npm install electron-prebuilt -g

###Make a new floder where you want to put the project :
cd ~
mkdir name_for_prj
cd name_for_prj

###Take the project :
git clone https://github.com/patoninho1/Javascript.git

###Install chalk :
npm install chalk

###Start the project :
electron main.js


## How to use :

### Parameter of the simulation :
As you can see on this screen, you have to choice the parameter of the simulation.
Like how mutch client & restaurant do you want, or witch menu can they use.
![alt tag](http://puu.sh/nSdkO/aaeb634b63.png)

### Simulation :
The principal part of the program, it here that the simulation take place.

![alt tag](http://puu.sh/nSdpD/0295ca2d15.png)

The timer on the right corner show the current time of the simulation.
On the left corner you have a button for terminate the simulation.
and the principal part is the center where each actor of the simulation have a "dashboard" where you can see what he is currently doing.

For a restaurant red mean not open , and Green open.
The restaurant open only if the current time correspond with his open hour and if he as food for make at least one menu.
You can see the open hours of a restaurant on the line "My hour".
You can see his current stock of food behind the line food stock, for example 0,0,0,4 mean that he as only 4 salad.
there is also the score of the restaurant, and the last line inform us if the restaurant has no more food for make a menu.

For a client red mean he is looking for a restaurant, blue mean he is waiting 10 min after fail to go to the restaurant he choice.
Green mean he succed to go in a restaurant and is choicing a menu/wait for his food/eating.

### End :

When you top the program, you get this message box, with the ID of the better restaurant and his amount of point.
![alt tag](http://puu.sh/nSdqn/70e06e8771.png)
