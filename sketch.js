
var trex ,trex_running,trex_collided;

var ground, ground_image;

var dummuyGround, invisible_ground;

var clouds, clouds_image, cloud_group;

var cactus, obstacle_1, obstacle_2, obstacle_3, obstacle_4, obstacle_5,obstacle_6, cactus_group;
var PLAY=1;
var END=0;
var gameState=PLAY;

var reset, gameOver, reset_image,game_over;

var dies_Sound, jump_sound, checkpoint_sound;


 
var score=0;
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");

  trex_collided=loadAnimation("trex_collided.png");

  ground_image=loadImage("ground2.png");

  clouds_image=loadImage("cloud.png");

  obstacle_1=loadImage("obstacle1.png");

  obstacle_2=loadImage("obstacle2.png");

  obstacle_3=loadImage("obstacle3.png");

  obstacle_4=loadImage("obstacle4.png");

  obstacle_5=loadImage("obstacle5.png");

  obstacle_6=loadImage("obstacle6.png");

  game_over=loadImage("gameOver.png");

  reset_image=loadImage("restart.png");

  dies_Sound=loadSound("die.mp3");

  jump_sound=loadSound("jump.mp3");

  checkpoint_sound=loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(600,200)
  
 trex=createSprite(300,100,20,20);
 trex.addAnimation("running",trex_running);
 trex.scale=0.5;

 trex.addAnimation("collided Dino",trex_collided);
 trex.debug=true;
 //first value: shape, 2nd value:x offset, 3rd value: radius(50);
 trex.setCollider("circle",0,0,50);

 ground=createSprite(300,170,600,20);
 ground.addImage("infinite",ground_image);


 reset= createSprite(300,100,20,20);
 reset.addImage("restart",reset_image);
 reset.scale=0.5;

 gameOver= createSprite (300,100,20,20);
 gameOver.addImage("image",game_over);
 gameOver.scale=0.5;

 


 gameOver.visible=false;
 reset.visible=false;

  dummyGround=createSprite(300,180,600,20);
  //
  dummyGround.debug=true;

 var randomNo=Math.round(random(1,10));
 console.log(randomNo);

 //creating Groups
 cloud_group=new Group ();
 cactus_group=new Group ();
}

function draw(){

  background("white")

  text("Score="+score,520,20);

  if (gameState==PLAY) {
    //reseting ground
  if(ground.x<0){
    ground.x=ground.width/2
  }
  //Increacsing the score
  score=score+Math.round(getFrameRate()/60);
  createClouds();
  createCactus();
 //trex jumping
 if(keyDown("up")&&trex.collide(dummyGround)){
  trex.velocityY= -10

  jump_sound.play();
}
//Game Adaptivity Code(Incerase in speed)
 ground.velocityX=-(6+score/100);
//Playing checkPoint sound at every 100 score
if(score%500===0&&score>0){
  checkpoint_sound.play();
}

  // Gravity
  trex.velocityY=trex.velocityY+0.2;
  if(cactus_group.isTouching(trex)){
    gameState=END

    dies_Sound.play();


  }
}
  else if(gameState==END){
    gameOver.visible=true;
    reset.visible=true;
  ground.velocityX=0;
  cloud_group.setVelocityXEach(0);
  cactus_group.setVelocityXEach(0);

  //setting lifetime to fix cloud destroying bugs.
  cloud_group.setLifetimeEach(-1);
  cactus_group.setLifetimeEach(-1);

  //Change in Animation
  trex.changeAnimation("collided Dino",trex_collided);
  }

   trex.collide(dummyGround);

  dummyGround.visible=false;

  //mousePressed to restart the game.
  if(mousePressedOver(reset)){
    restartGame()
  }

  console.log(frameCount);
drawSprites();
}

function createClouds(){

  if(frameCount%100===0){
    clouds=createSprite(700,100,20,20);
    clouds.velocityX=-6;
    clouds.addImage("water",clouds_image);
    clouds.scale=0.5;
    clouds.y=Math.round(random(100,130));
    clouds.depth=trex.depth;
    //to avoid passing via clouds(+ center of the sprite, no depth of sprite)
    trex.depth=trex.depth+1

    clouds.lifetime=300;
    cloud_group.add(clouds);
  }

}

function createCactus() {
  if(frameCount%150===0){
    cactus=createSprite(600,160,20,20);
    cactus.velocityX=-2;
    var rand=Math.round(random(1,6))
    switch(rand){
    case 1: cactus.addImage("C1",obstacle_1);
    break;
    case 2:cactus.addImage("C2",obstacle_2);
    break;
    case 3:cactus.addImage("C3",obstacle_3);
    break;
    case 4:cactus.addImage("C4",obstacle_4);
    break;
    case 5:cactus.addImage("C5",obstacle_5);
    break;
    case 6:cactus.addImage("C6",obstacle_6);
    break;
    default:break;
   }
    cactus.scale=0.5;
    cactus.lifetime=300;
    cactus_group.add(cactus);
  }

}

function restartGame() {
gameState=PLAY;
cactus_group.destroyEach();
cloud_group.destroyEach();
reset.visible=false;
gameOver.visible=false;
trex.changeAnimation("running",trex_running);
score=0;

}