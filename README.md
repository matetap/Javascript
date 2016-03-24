# TP Javascript ESME Sudria 2C

## How to set up :

###Install git :
sudo apt-get update<br />
sudo apt-get install git<br />

###Install node js :
sudo apt-get install nodejs<br />
(you can check if it is installed by using the node -v command).<br />

###Install npm :
sudo npm install npm -g<br />

###Install electron :
sudo npm install electron-prebuilt -g<br />

###Make a new folder where you want to put the project in:
cd ~<br />
mkdir name_for_prj<br />
cd name_for_prj<br />

###Take the project :
git clone https://github.com/patoninho1/Javascript.git<br />

###Install chalk :
npm install chalk<br />

###Start the project :
electron main.js<br />


## How to use it :

### Parameters of the simulation :
As you can see on this window, you have to choose the parameters of the simulation.
Like how much client & restaurant you want, or which menu they can order.
<br />
![alt tag](http://puu.sh/nSdkO/aaeb634b63.png)
<br />
### Simulation :
The main part of the program. It's where the simulation takes place.
<br />
![alt tag](http://puu.sh/nSdpD/0295ca2d15.png)
<br />
The timer on the right corner shows the current time of the simulation.
On the left corner you have a button to terminate the simulation.
and the main part is the center where each actor of the simulation has a "dashboard" where he can see what he's currently doing.

For a restaurant red means not open , and Green open.
The restaurant opens only if the current time correspond with its openening hours and if he has enough food to cook at least one menu.
You can check the opening hours of a restaurant in the line "My hour".
You can check its current food's stock behind the line food stock. For example 0,0,0,4 means that he has only 4 salads left.
There is also the score of the restaurant, and the last line informs us if the restaurant has no more food to cook a menu.

For a client red means that he is looking for a restaurant, blue means he is waiting 10 min after having failed to get the restaurant he chose.
Green mean he succeeds to go in a restaurant and is choosing a menu/waiting for his meal.

### End :

When you end the program, you get this message box, with the ID of the best restaurant and its total points.
<br />
![alt tag](http://puu.sh/nSdqn/70e06e8771.png)
<br />
