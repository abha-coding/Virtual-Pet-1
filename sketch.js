//Create variables here
var dog,dogPhoto;
var happyDog,happyDogPhoto;
var database;
var foodS;
var foodStock;

function preload()
{
	//load images here
  dogPhoto=loadImage("dogImg.png");
  happyDogPhoto=loadImage("dogImg1.png");
}

function setup() {

  database = firebase.database();

  

	createCanvas(700, 500);

  dog = createSprite(420,350,20,20);
  dog.addImage(dogPhoto);
  dog.scale = 0.3;
  

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46,139,87);

  textSize(20);
  //textColor(red);
  fill("black");
  text("Press UP arrow key to feed the dog milk",200,200)

  if(keyDown(UP_ARROW))
  {
    changeStock(-1);
  }
  
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogPhoto);
  }

  drawSprites();
  //add styles here

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}