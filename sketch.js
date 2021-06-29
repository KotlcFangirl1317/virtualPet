var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed = 0
var lastFedm = 0

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood=createButton("Feed the dog");
  feedFood.position(900,95);
  feedFood.mousePressed(feedDog)


  addFood=createButton("Add Food");
  addFood.position(1000,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  getState()
 
  //write code to display text lastFed time here
  textSize(20)
  fill("white")
  text("Last fed at " + lastFed + ":" + lastFedm,530,30)
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  foodS--;
  dog.addImage(happyDog);
  //write code here to update food stock and last fed time
  var d = new Date();
  var n = d.getHours();
  var m = d.getMinutes();
  database.ref('/').update({
    Food:foodS,
    time:n,
    minutes:m
  })      
}

function getState(){
  var gameStateRef  = database.ref('time');
  gameStateRef.on("value",function(data){
     lastFed = data.val();
  })
  var gameStateRef1  = database.ref('minutes');
  gameStateRef1.on("value",function(data){
    lastFedm = data.val();
 })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
