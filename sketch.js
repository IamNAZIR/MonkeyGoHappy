var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, rock, obstacleImage
var FoodGroup, obstacleGroups
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 560)
  
  
  monkey = createSprite(100, 300)
  monkey.addAnimation("runBoi!",monkey_running)
  monkey.scale = 0.09
  monkey.velocityY = 5
  ground = createSprite(300, 335, 800, 15)
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
  
  score = 0
}


function draw() {
 background("white")
  
  
  
 if (gameState === PLAY) {
    
    monkey.collide(ground)
    
    if(keyDown("space")&& monkey.y >= 290) {
      
        monkey.velocityY = -17;
  
    }
   score = score + Math.round(getFrameRate()/60);
     
     monkey.velocityY = monkey.velocityY + 0.8;
   
    if (monkey.isTouching(obstacleGroup)) {
      
        gameState = END;
    }
 }
    
  else if (gameState === END) {
    
       ground.velocityX = 0;
       monkey.velocityY = 0;
    
       obstacleGroup.setLifetimeEach(-1);
       foodGroup.setLifetimeEach(-1);
     
       obstacleGroup.setVelocityXEach(0);
       foodGroup.setVelocityXEach(0);
    
    
  }
  
  stroke ("black")
  textSize (20)
  score = Math.ceil(frameCount/frameRate())
  text("survival time : "+score, 400, 25)
  
  spawnrock();
  spawnClouds();
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(140,200));
    cloud.addImage(bananaImage);
    cloud.scale = 0.08;
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;

    //add each cloud to the group
    foodGroup.add(cloud);
  }
}

function spawnrock() {

if (frameCount % 250 === 0) {
    rock = createSprite(600,300,40,10);
    rock.y = Math.round(random(300,300));
    rock.addImage(obstacleImage);
    rock.scale = 0.16;
    rock.velocityX = -5;
    
     //assign lifetime to the variable
    rock.lifetime = 200;

    //add each cloud to the group
    obstacleGroup.add(rock);
  }
}


